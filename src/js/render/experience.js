// Experience: one carousel that runs through work, programs and hackathons.
// Every card opens the details modal.

import { html, safeUrl, formatRange, monthsBetween, durationLabel } from "../util.js";
import { createCarousel } from "../carousel.js";
import { registerDetails } from "../modal.js";
import { linkButtons } from "./shared.js";
import { thumbnail, stage } from "./media.js";

const keyOf = (entry) => `exp-${entry.id}`;
const roleLine = (entry) => [entry.role, entry.team].filter(Boolean).join(" · ");

// A summary is left out only when the bullets already say nearly every word of it
// (at least 90%), so a fact that appears only in the summary is never lost.
function summaryRepeats(entry) {
  if (!entry.highlights.length) return false;
  const words = (text) => new Set((text.toLowerCase().match(/[a-z0-9%+]+/g) ?? []).filter((w) => w.length > 2));
  const summary = [...words(entry.summary)].filter((w) => !["the", "and", "for", "with", "from"].includes(w));
  const said = words([entry.org, roleLine(entry), ...entry.highlights].join(" "));
  return summary.filter((w) => said.has(w)).length >= summary.length * 0.9;
}

function card(entry, { copy }) {
  const months = monthsBetween(entry.start, entry.end);
  return html`<button type="button" class="reel-card" data-detail="${keyOf(entry)}" aria-haspopup="dialog"${copy ? html` tabindex="-1"` : ""}>
    ${thumbnail({ demo: entry.demo, image: entry.cover, logos: entry.logos })}
    <span class="reel-body">
      <span class="reel-name">${entry.org}</span>
      <span class="reel-sub">${roleLine(entry)}</span>
      <span class="reel-meta">${formatRange(entry.start, entry.end)} · ${durationLabel(months)}</span>
      <span class="duration-bar" style="--months:${months}" aria-hidden="true"></span>
    </span>
  </button>`;
}

function details(entry) {
  const links = linkButtons(entry.links, entry.org);
  const evidence = entry.media
    .map((image) => ({ ...image, src: safeUrl(image.src) }))
    .filter((image) => image.src && image.src !== entry.cover?.src)
    .map(
      (image) =>
        html`<a class="evidence" href="${image.src}" target="_blank" rel="noopener"><img src="${image.src}" alt="${image.alt ?? ""}"><span class="visually-hidden"> (opens in a new tab)</span></a>`
    );

  return html`${stage({ demo: entry.demo, image: entry.cover, logos: entry.logos, title: entry.org })}
    <div class="detail">
      <h2 class="detail-title" id="detail-title">${entry.org}</h2>
      <p class="detail-context">${roleLine(entry)}</p>
      <div class="detail-main">
        ${entry.summary && !summaryRepeats(entry) ? html`<p>${entry.summary}</p>` : ""}
        ${entry.highlights.length ? html`<ul class="detail-highlights">${entry.highlights.map((h) => html`<li>${h}</li>`)}</ul>` : ""}
      </div>
      <div class="detail-side">
        <div>
          <p class="detail-label">When</p>
          <p class="detail-when">${formatRange(entry.start, entry.end)}<br>${durationLabel(monthsBetween(entry.start, entry.end))}${
            entry.location ? html`<br>${entry.location}` : ""
          }</p>
        </div>
        ${
          entry.metrics.length
            ? html`<ul class="detail-metrics">${entry.metrics.map(
                (m) => html`<li><span class="metric-value">${m.value}</span><span class="metric-label">${m.label}</span></li>`
              )}</ul>`
            : ""
        }
        ${entry.tags.length ? html`<div><p class="detail-label">Focus</p><ul class="tag-list">${entry.tags.map((t) => html`<li class="tag">${t}</li>`)}</ul></div>` : ""}
        ${evidence.length ? html`<div><p class="detail-label">Evidence</p><div class="evidence-list">${evidence}</div></div>` : ""}
        ${links.length ? html`<div class="detail-links">${links}</div>` : ""}
      </div>
    </div>`;
}

export function renderExperience(root, groups) {
  createCarousel(root, { groups, card, label: `Experience: ${groups.map((g) => g.label).join(", ")}` });
  registerDetails(groups.flatMap((g) => g.items).map((entry) => [keyOf(entry), () => details(entry)]));
}
