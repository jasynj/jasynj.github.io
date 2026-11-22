// The 16:9 picture on a card and the player at the top of the modal.
// Card markup sits inside a <button>, so it only uses phrasing elements (spans).

import { html, safeUrl, ICONS } from "../util.js";

function picture(image, { alt = "", className = "" } = {}) {
  const src = safeUrl(image?.src);
  if (!src) return "";
  const focus = image.focus ? html` style="object-position:${image.focus}"` : "";
  return html`<img class="frame-img ${className}" src="${src}" alt="${alt}"${focus} loading="lazy" decoding="async" draggable="false" referrerpolicy="no-referrer">`;
}

function logoTiles(logos = []) {
  const shown = logos.filter((logo) => safeUrl(logo.src)).slice(0, 2);
  if (!shown.length) return "";
  return html`<span class="logo-tiles${shown.length > 1 ? " is-pair" : ""}">${shown.map(
    (logo) => html`<span class="logo-tile"><img src="${safeUrl(logo.src)}" alt="" draggable="false" decoding="async"></span>`
  )}</span>`;
}

const playBadge = () => html`<span class="play-badge">${ICONS.play}</span>`;

// What a card shows, in order: the demo, a picture, the logos, the empty placeholder.
export function thumbnail({ demo, image, logos, note }) {
  const hasDemo = Boolean(safeUrl(demo?.url));
  const thumb = hasDemo && safeUrl(demo.thumbnail);
  // YouTube's automatic thumbnail has black bars baked in; a hand-made one is left alone.
  const barred = thumb && /^https:\/\/img\.youtube\.com\//.test(thumb);
  const still = thumb ? picture({ src: thumb }, { className: barred ? "is-video is-barred" : "is-video" }) : picture(image, { className: hasDemo || image?.focus ? "" : "is-still" });
  const tiles = still ? "" : logoTiles(logos);
  const empty = !hasDemo && !still && !tiles;
  return html`<span class="frame${empty ? " frame-empty" : ""}" aria-hidden="true">
    ${still}${tiles}
    ${hasDemo ? playBadge() : ""}
    ${empty ? ICONS.noVideo : ""}
    ${hasDemo ? html`<span class="frame-label">Watch demo</span>` : note ? html`<span class="frame-label is-muted">${note}</span>` : ""}
  </span>`;
}

function player(demo, title) {
  const url = safeUrl(demo.url);
  const src = safeUrl(demo.embedUrl);
  // Opening the modal is the visitor's play press, but not for someone who asked for less motion.
  const autoplay = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  const label = `${title}: demo video`;

  if (src && demo.provider === "file") {
    return html`<video class="frame-player" src="${src}" aria-label="${label}" controls muted playsinline preload="metadata"${
      autoplay ? html` autoplay` : ""
    }></video>`;
  }
  if (src) {
    const embed = demo.provider === "youtube" && autoplay ? `${src}&autoplay=1&mute=1` : src;
    return html`<iframe class="frame-player" src="${embed}" title="${label}" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  }
  return html`${picture({ src: demo.thumbnail }, { className: "is-video" })}
    <a class="btn btn-move frame-link" href="${url}" target="_blank" rel="noopener">${demo.label}<span class="visually-hidden"> (opens in a new tab)</span>${ICONS.external}</a>`;
}

// The top of the modal.
export function stage({ demo, image, logos, note, title }) {
  if (safeUrl(demo?.url)) return html`<div class="frame frame-stage">${player(demo, title)}</div>`;
  const still = picture(image, { alt: image?.alt ?? "", className: image?.focus ? "" : "is-still" });
  const tiles = still ? "" : logoTiles(logos);
  const empty = !still && !tiles;
  return html`<div class="frame frame-stage${empty ? " frame-empty" : ""}">
    ${still}${tiles}
    ${empty ? ICONS.noVideo : ""}
    ${note ? html`<span class="frame-label is-muted">${note}</span>` : ""}
  </div>`;
}

// A thumbnail that fails to load (a Drive file that stopped being shared, say) leaves the hatch.
export function initMedia() {
  document.addEventListener(
    "error",
    (e) => {
      if (e.target.matches?.("img.frame-img")) e.target.remove();
    },
    true
  );
}
