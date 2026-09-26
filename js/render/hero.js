// First screen: who Jason is, at a glance. The board beside it just plays openings.

import { createOpeningsBoard } from "../board.js";
import { html, safeUrl } from "../util.js";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function renderHero({ board, caption, photo, facts, schedule }, profile) {
  createOpeningsBoard(board, caption, { reducedMotion: REDUCED_MOTION });

  const src = safeUrl(profile.photo?.src);
  if (src) {
    photo.innerHTML = html`<img src="${src}" alt="${profile.photo.alt ?? ""}" decoding="async" fetchpriority="high">`.value;
  }

  facts.innerHTML = (profile.facts ?? [])
    .map((fact) => html`<div><dt>${fact.label}</dt><dd>${fact.value}${fact.detail ? html`<span class="fact-detail">${fact.detail}</span>` : ""}</dd></div>`)
    .join("");

  const booking = safeUrl(profile.schedule);
  if (booking) schedule.href = booking;
}
