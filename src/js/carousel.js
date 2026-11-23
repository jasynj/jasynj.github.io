// A looping, drifting carousel made of labelled groups. It knows nothing about the content.
//
// It renders three copies of the list. The middle one is real (focusable and announced);
// the outer two let the loop wrap in either direction without a visible jump. It drifts
// with native scrolling, so swipe, trackpad and keyboard all keep working. If everything
// fits on screen there's nothing to loop, so it shows one still copy.

import { html, ICONS } from "./util.js";

const SPEED = 40; // px per second
const GLIDE_MS = 650; // arrows and group links
const HOLD_MS = 3000; // how long it waits after the visitor moves it
const COPIES = [0, 1, 2];

// groups: [{ id, label, items }]. card(item, { copy }) returns a <button>; copy marks the silent repeats.
export function createCarousel(root, { groups, card, label }) {
  const list = groups.flatMap((group, g) => group.items.map((item, i) => ({ item, g, start: i === 0 ? group.label : "" })));
  const count = list.length;
  root.replaceChildren();
  if (!count) return;

  const slots = (n) =>
    list.map(
      ({ item, g, start }) => html`<div class="carousel-slot" data-group="${g}"${n === 1 ? "" : html` aria-hidden="true"`}>
        <div class="carousel-marker${start ? " is-start" : ""}" aria-hidden="true">${start ? html`<span>${start}</span>` : ""}</div>
        ${card(item, { copy: n !== 1 })}
      </div>`
    );

  root.innerHTML = html`<div class="carousel-head">
      <div class="carousel-groups">${groups.map(
        (group, g) => html`<button type="button" class="carousel-group" data-go="${g}">${group.label}<span class="carousel-count">${group.items.length}</span></button>`
      )}</div>
      <div class="carousel-controls">
        <button type="button" class="icon-button" data-pause></button>
        <button type="button" class="icon-button" data-step="-1" aria-label="Previous">${ICONS.previous}</button>
        <button type="button" class="icon-button" data-step="1" aria-label="Next">${ICONS.next}</button>
      </div>
    </div>
    <div class="carousel-track" role="group" aria-label="${label}">${COPIES.map(slots)}</div>`.value;

  const track = root.querySelector(".carousel-track");
  const head = root.querySelector(".carousel-head");
  const cells = [...track.children];
  const links = [...root.querySelectorAll("[data-go]")];
  const pauseButton = root.querySelector("[data-pause]");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");

  let loopWidth = 0;
  let step = 1;
  let gutter = 0;
  let width = 0;
  let still = false; // everything fits, nothing loops
  let position = 0; // scrollLeft, with the fraction the browser rounds away
  let glide = null;
  let holdUntil = 0;
  let last = 0;
  let frame = 0;
  let active = -1;
  let paused = motion.matches;
  let hovered = false;
  let tabbing = false;
  let touching = false;
  let visible = false;
  let drag = null;
  let dragged = false;

  const wrap = (x) => {
    if (still) return x;
    if (x < loopWidth * 0.5) return x + loopWidth;
    if (x >= loopWidth * 1.5) return x - loopWidth;
    return x;
  };
  const hold = (ms = HOLD_MS) => (holdUntil = performance.now() + ms);
  const put = (x) => {
    position = x;
    track.scrollLeft = x;
  };

  function markGroup() {
    const i = Math.round((position + gutter) / step);
    const g = still ? 0 : Number(cells[Math.min(cells.length - 1, Math.max(0, i))].dataset.group);
    if (g === active) return;
    active = g;
    links.forEach((link) => link.setAttribute("aria-current", String(Number(link.dataset.go) === g)));
  }

  function measure() {
    if (track.clientWidth === width) return;
    width = track.clientWidth;
    const progress = loopWidth && !still ? (position - loopWidth) / loopWidth : null;
    step = cells[count].getBoundingClientRect().width || 1;
    loopWidth = step * count;
    gutter = parseFloat(getComputedStyle(head).paddingLeft) || 0;
    still = loopWidth <= width - gutter;
    root.classList.toggle("is-still", still);
    glide = null;
    put(still ? 0 : wrap(loopWidth + (progress === null ? -gutter : progress * loopWidth)));
    markGroup();
  }

  function goTo(target) {
    if (still) return;
    hold();
    if (motion.matches) {
      put(wrap(target));
      markGroup();
      return;
    }
    const from = wrap(position);
    const to = target + from - position;
    put(from);
    glide = { from, to, began: performance.now() };
    run();
  }

  function tick(now) {
    frame = 0;
    const elapsed = last ? Math.min(now - last, 64) : 0;
    last = now;
    if (glide) {
      const t = Math.min(1, Math.max(0, (now - glide.began) / GLIDE_MS));
      put(glide.from + (glide.to - glide.from) * (1 - (1 - t) ** 3));
      if (t === 1) glide = null;
    } else if (!drag && !still) {
      const scrolled = Math.abs(track.scrollLeft - position) > 4; // swipe, trackpad, Tab
      if (scrolled || touching) {
        position = track.scrollLeft;
        hold();
      }
      const focused = tabbing && track.contains(document.activeElement);
      const drifting =
        !paused && !hovered && !touching && !focused && visible && now > holdUntil && !document.querySelector("dialog[open]");
      const next = drifting ? position + (SPEED * elapsed) / 1000 : position;
      const x = focused || touching ? next : wrap(next); // don't move what's focused or under a finger
      if (x !== position) put(x);
    }
    markGroup();
    if (visible || glide) run();
    else last = 0;
  }

  function run() {
    if (!frame) frame = requestAnimationFrame(tick);
  }

  function labelPause() {
    pauseButton.innerHTML = String(paused ? ICONS.play : ICONS.pause);
    pauseButton.setAttribute("aria-label", paused ? "Play the carousel" : "Pause the carousel");
  }

  pauseButton.addEventListener("click", () => {
    paused = !paused;
    glide = null;
    if (!paused) holdUntil = 0;
    labelPause();
  });
  motion.addEventListener("change", () => {
    paused = motion.matches;
    labelPause();
  });

  root.querySelectorAll("[data-step]").forEach((button) =>
    button.addEventListener("click", () => {
      const from = glide ? glide.to : position;
      goTo((Math.round((from + gutter) / step) + Number(button.dataset.step)) * step - gutter);
    })
  );
  links.forEach((link) =>
    link.addEventListener("click", () => {
      const first = list.findIndex((entry) => entry.g === Number(link.dataset.go));
      const stops = COPIES.map((n) => (n * count + first) * step - gutter).filter((x) => x >= 0);
      goTo(stops.reduce((best, x) => (Math.abs(x - position) < Math.abs(best - position) ? x : best)));
    })
  );

  document.addEventListener("keydown", (e) => e.key === "Tab" && (tabbing = true), true);
  document.addEventListener("pointerdown", () => (tabbing = false), true);
  track.addEventListener("focusin", () => {
    if (tabbing) glide = null;
  });

  track.addEventListener("pointerenter", (e) => (hovered = e.pointerType === "mouse"));
  track.addEventListener("pointerleave", () => (hovered = false));
  track.addEventListener(
    "touchstart",
    () => {
      touching = true;
      glide = null;
    },
    { passive: true }
  );
  for (const type of ["touchend", "touchcancel"]) {
    track.addEventListener(type, () => {
      touching = false;
      hold();
    });
  }
  track.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      glide = null;
      hold();
    },
    { passive: true }
  );

  // Mouse drag. A press that moved is a drag, not a click on the card.
  track.addEventListener("mousedown", (e) => e.preventDefault()); // no focus on the silent copies
  track.addEventListener("pointerdown", (e) => {
    dragged = false;
    if (e.pointerType !== "mouse" || e.button || still) return;
    glide = null;
    drag = { x: e.clientX };
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const moved = e.clientX - drag.x;
    if (!dragged && Math.abs(moved) < 5) return;
    dragged = true;
    track.classList.add("is-dragging");
    put(wrap(position - moved));
    drag.x = e.clientX;
  });
  const release = () => {
    if (!drag) return;
    drag = null;
    track.classList.remove("is-dragging");
    hold();
  };
  window.addEventListener("pointerup", release);
  window.addEventListener("pointercancel", release);
  track.addEventListener(
    "click",
    (e) => {
      if (dragged && e.detail) e.stopPropagation(); // detail is 0 for a keyboard press
      dragged = false;
    },
    true
  );

  new IntersectionObserver((seen) => {
    visible = seen[seen.length - 1].isIntersecting;
    if (visible) run();
  }).observe(track);
  new ResizeObserver(measure).observe(track);
  labelPause();
  measure();
}
