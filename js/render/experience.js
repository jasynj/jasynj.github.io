// Experience: a work timeline (newest first), then programs & hackathons.
// Every entry is one row; click it to expand the full notes, demo, and links.

import { html, safeUrl, formatRange, monthsBetween, durationLabel, ICONS } from "../util.js";
import { linkButtons, demoCard, hasDetail } from "./shared.js";

function logos(entry) {
  return entry.logos
    .map((logo) => ({ ...logo, src: safeUrl(logo.src) }))
    .filter((logo) => logo.src)
    .map((logo) => html`<img src="${logo.src}" alt="${logo.alt ?? ""}" width="36" height="36" loading="lazy">`);
}

function when(entry) {
  const months = monthsBetween(entry.start, entry.end);
  return html`<div class="entry-when">
    <span class="entry-dates">${formatRange(entry.start, entry.end)}</span>
    <span class="entry-bar" style="--months:${months}" aria-hidden="true"></span>
    <span class="entry-where">${durationLabel(months)}${entry.location ? html` · ${entry.location}` : ""}</span>
  </div>`;
}

function detail(entry) {
  const evidence = entry.media
    .map((m) => ({ ...m, src: safeUrl(m.src) }))
    .filter((m) => m.src)
    .map(
      (m) =>
        html`<a class="evidence" href="${m.src}" target="_blank" rel="noopener"><img src="${m.src}" alt="${m.alt ?? ""}" loading="lazy"></a>`
    );
  const links = linkButtons(entry.links, entry.org);
  return html`<div class="entry-detail">
    <div class="entry-notes">
      ${entry.highlights.length ? html`<ul class="entry-highlights">${entry.highlights.map((h) => html`<li>${h}</li>`)}</ul>` : ""}
      ${entry.tags.length ? html`<p class="entry-tags">${entry.tags.join(" · ")}</p>` : ""}
      ${links.length ? html`<div class="entry-links">${links}</div>` : ""}
      ${evidence.length ? html`<div class="entry-evidence">${evidence}</div>` : ""}
    </div>
    ${entry.demo ? html`<div class="entry-demo">${demoCard(entry.demo, entry.org)}</div>` : ""}
  </div>`;
}

function entryRow(entry, { compact = false } = {}) {
  const expandable = hasDetail(entry);
  const panelId = `exp-${entry.id}-detail`;
  const metrics =
    !compact && entry.metrics.length
      ? html`<ul class="entry-metrics">${entry.metrics.map(
          (m) => html`<li><span class="metric-value">${m.value}</span> <span class="metric-label">${m.label}</span></li>`
        )}</ul>`
      : "";
  const title = expandable
    ? html`<button type="button" class="entry-button" aria-expanded="false" aria-controls="${panelId}">${entry.org}</button>`
    : entry.org;

  return html`<li class="entry${compact ? " entry-compact" : ""}" id="exp-${entry.id}"${
    expandable ? html` data-disclosure` : ""
  }>
    <div class="entry-row"${expandable ? html` data-disclosure-row` : ""}>
      ${when(entry)}
      <div class="entry-main">
        <div class="entry-head">
          <span class="entry-logos">${logos(entry)}</span>
          <div>
            <h3 class="entry-org">${title}</h3>
            <p class="entry-role">${entry.role}${entry.team ? html` · ${entry.team}` : ""}</p>
          </div>
        </div>
        ${entry.summary ? html`<p class="entry-summary">${entry.summary}</p>` : ""}
        ${metrics}
      </div>
      <div class="entry-aside">
        ${expandable ? html`<span class="entry-toggle" aria-hidden="true">${entry.demo ? "Details & demo" : "Details"}${ICONS.toggle}</span>` : ""}
      </div>
    </div>
    ${expandable ? html`<div class="entry-panel" id="${panelId}" hidden>${detail(entry)}</div>` : ""}
  </li>`;
}

export function renderExperience({ work: workRoot, programs: programsRoot }, { work, programs }) {
  workRoot.innerHTML = work.map((entry) => entryRow(entry)).join("");
  programsRoot.innerHTML = programs.map((entry) => entryRow(entry, { compact: true })).join("");
}
