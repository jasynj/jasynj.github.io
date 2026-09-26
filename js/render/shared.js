// Pieces used by both the experience and project renderers.

import { html, safeUrl, ICONS } from "../util.js";

const LINK_LABELS = { live: "Live site", code: "Code" };

export function linkButtons(links, subject) {
  return links
    .map((link) => ({ ...link, url: safeUrl(link.url) }))
    .filter((link) => link.url)
    .map(
      (link) =>
        html`<a class="btn btn-line" href="${link.url}" target="_blank" rel="noopener">${LINK_LABELS[link.kind]}<span class="visually-hidden"> for ${subject}</span>${ICONS.external}</a>`
    );
}

// A demo is secondary: a small thumbnail card inside the expanded view that opens in a new tab.
export function demoCard(demo, subject) {
  const url = safeUrl(demo?.url);
  if (!url) return "";
  const thumbnail = safeUrl(demo.thumbnail);
  return html`<a class="demo" href="${url}" target="_blank" rel="noopener">
    <span class="demo-thumb${thumbnail ? "" : " demo-thumb-empty"}">
      ${thumbnail ? html`<img src="${thumbnail}" alt="" loading="lazy" decoding="async">` : ""}
      <span class="demo-play">${ICONS.play}</span>
    </span>
    <span class="demo-label">${demo.label}<span class="visually-hidden"> of ${subject} (opens in a new tab)</span>${ICONS.external}</span>
  </a>`;
}

export function hasDetail(block) {
  return Boolean(block.highlights?.length || block.media?.length || block.demo || block.links?.length);
}
