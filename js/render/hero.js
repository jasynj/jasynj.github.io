// First screen: who Jason is, at a glance. The board beside it just plays openings.

import { createOpeningsBoard } from "../board.js";
import { html, safeUrl } from "../util.js";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function renderHero({ board, caption, photo, facts, schedule }, profile) {
  createOpeningsBoard(board, caption, { reducedMotion: REDUCED_MOTION });

  const src = safeUrl(profile.heroPhoto?.src ?? profile.aboutPhoto?.src);
  if (src) {
    const alt = profile.heroPhoto?.alt ?? profile.aboutPhoto?.alt ?? "";
    photo.innerHTML = html`<img src="${src}" alt="${alt}" width="1000" height="1294" decoding="async" fetchpriority="high">`.value;
  }

  facts.innerHTML = (profile.facts ?? [])
    .map((fact) => html`<div><dt>${fact.label}</dt><dd>${fact.value}${fact.detail ? html`<span class="fact-detail">${fact.detail}</span>` : ""}</dd></div>`)
    .join("");

  // A booking link when there is one; until then the button opens a meeting-request email.
  const booking = safeUrl(profile.schedule);
  if (booking) {
    schedule.href = booking;
    schedule.target = "_blank";
    schedule.rel = "noopener";
  } else if (profile.email) {
    schedule.href = `mailto:${profile.email}?subject=${encodeURIComponent("Meeting request")}&body=${encodeURIComponent(
      "Hi Jason,\n\nI'd like to set up a time to talk. A few times that work for me:\n\n- \n- \n\nBest,\n"
    )}`;
  }
}
