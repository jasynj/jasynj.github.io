// The details modal shared by Experience and Projects.
// A native <dialog> provides the focus trap, Esc and the inert page behind it.
// The URL hash mirrors what's open (#exp-meta-2026, #project-cee), so a card can be
// linked to and the Back button closes it.

const details = new Map();

let dialog;
let body;
let current = null; // hash key of what's showing
let opener = null;
let pushed = false; // whether opening added a history entry, so closing should go back

// A renderer registers what each card opens: `items` is [key, () => markup].
export function registerDetails(items) {
  for (const [key, render] of items) details.set(key, render);
}

// The carousel repeats its cards, so prefer the one that's announced and focusable.
function cardFor(key) {
  return [...document.querySelectorAll("[data-detail]")].find((el) => el.dataset.detail === key && !el.closest("[aria-hidden='true']"));
}

function show(key) {
  opener = cardFor(key) ?? null;
  current = key;
  body.innerHTML = String(details.get(key)());
  if (!dialog.open) dialog.showModal();
  body.scrollTop = 0;
  dialog.querySelector("[data-close]").focus();
}

function open(key) {
  if (!details.has(key)) return;
  show(key);
  history.pushState({ detail: key }, "", `#${key}`);
  pushed = true;
}

function keyFromHash() {
  let key = location.hash.slice(1);
  try {
    key = decodeURIComponent(key);
  } catch {
    return null; // a malformed hash isn't one of ours
  }
  return details.has(key) ? key : null;
}

// Back, Forward and edited hashes: make the modal match the URL.
export function syncModal() {
  const key = keyFromHash();
  if (key === current) return;
  if (key) {
    show(key);
    pushed = history.state?.detail === key;
  } else {
    current = null;
    pushed = false;
    dialog.close();
  }
}

// A pasted link: bring the card into view behind the modal, then open it.
export function openLinkedDetail() {
  const key = keyFromHash();
  if (!key) return;
  const card = cardFor(key);
  if (card) scrollTo({ top: card.getBoundingClientRect().top + scrollY - 160, behavior: "instant" });
  show(key);
  pushed = false;
}

function onClose() {
  if (dialog.open) return; // already reopened on something else
  body.replaceChildren(); // removes the player, so the sound stops
  opener?.focus({ preventScroll: true });
  if (!current) return; // closed by Back, the URL is already right
  current = null;
  if (pushed) history.back();
  else history.replaceState(null, "", location.pathname + location.search);
  pushed = false;
}

export function initModal(element) {
  dialog = element;
  body = dialog.querySelector("[data-modal-body]");

  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-detail]");
    if (card) open(card.dataset.detail);
  });
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());

  // Only a press that starts and ends on the backdrop closes it, so selecting text
  // and letting go outside the modal doesn't.
  const outside = (e) => {
    const r = dialog.getBoundingClientRect();
    return e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom);
  };
  let pressedOutside = false;
  dialog.addEventListener("pointerdown", (e) => (pressedOutside = outside(e)));
  dialog.addEventListener("click", (e) => {
    if (pressedOutside && outside(e)) dialog.close();
    pressedOutside = false;
  });

  dialog.addEventListener("close", onClose);
  window.addEventListener("popstate", syncModal);
  window.addEventListener("hashchange", syncModal);
}
