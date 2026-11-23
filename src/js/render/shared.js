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
