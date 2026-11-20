// Expandable rows (the ARIA accordion pattern): a heading holds the toggle button,
// the whole row is a click target, and links inside the row still work normally.

function setOpen(button, open) {
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  if (!panel) return;

  // Rows that share a group close each other (one project open at a time).
  if (open && button.dataset.group) {
    document
      .querySelectorAll(`[data-group="${button.dataset.group}"][aria-expanded="true"]`)
      .forEach((other) => other !== button && setOpen(other, false));
  }

  button.setAttribute("aria-expanded", String(open));
  panel.hidden = !open;
  button.closest("[data-disclosure]")?.classList.toggle("is-open", open);
}

export function initDisclosures(root) {
  root.addEventListener("click", (e) => {
    const row = e.target.closest("[data-disclosure-row]");
    if (!row || e.target.closest("a")) return;
    // Don't toggle when the visitor is selecting text.
    if (!e.target.closest("button") && String(window.getSelection()).length) return;
    const button = row.querySelector("[aria-controls]");
    if (button) setOpen(button, button.getAttribute("aria-expanded") !== "true");
  });
}

// Following a link like #exp-meta-2026 opens that row.
export function openFromHash() {
  const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  // Only a link to a specific row opens it; a link to a whole section doesn't.
  const button = target?.matches("[data-disclosure]") ? target.querySelector("[data-disclosure-row] [aria-controls]") : null;
  if (button) setOpen(button, true);
}
