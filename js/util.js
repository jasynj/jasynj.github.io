// Small helpers shared by every renderer.

/* Safe HTML templating -------------------------------------------------------
   Content can come from a backend, so every interpolated value is escaped unless
   it is itself the output of `html` (or explicitly wrapped with `raw`). */

class SafeHtml {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (value = "") => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

export const raw = (value) => new SafeHtml(String(value));

function interpolate(value) {
  if (value === null || value === undefined || value === false) return "";
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(interpolate).join("");
  return esc(value);
}

export function html(strings, ...values) {
  return new SafeHtml(strings.reduce((out, str, i) => out + str + (i < values.length ? interpolate(values[i]) : ""), ""));
}

// Only http(s), mailto, and site-relative URLs make it into an href or src.
export function safeUrl(url) {
  const value = String(url ?? "").trim();
  if (!value) return "";
  if (/^(https?:|mailto:)/i.test(value)) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//")) return "";
  return value;
}

/* Dates ---------------------------------------------------------------------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(ym) {
  const [year, month] = ym.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatRange(start, end) {
  if (!end) return `${formatMonth(start)} – Present`;
  if (start === end) return formatMonth(start);
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}

export function monthsBetween(start, end) {
  const [y1, m1] = start.split("-").map(Number);
  const now = new Date();
  const [y2, m2] = end ? end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  return Math.max(1, (y2 - y1) * 12 + (m2 - m1) + 1);
}

export function durationLabel(months) {
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years} yr ${rest} mo` : `${years} yr`;
}

export const byStartDesc = (a, b) => b.start.localeCompare(a.start);
export const byStartAsc = (a, b) => a.start.localeCompare(b.start);

/* Icons (authored SVG, one stroke weight) ------------------------------------ */

export const ICONS = {
  toggle: raw(
    '<svg class="icon icon-toggle" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10"/><path class="icon-toggle-v" d="M8 3v10"/></svg>'
  ),
  external: raw(
    '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3h7v7"/><path d="M13 3 4 12"/></svg>'
  ),
  play: raw('<svg class="icon icon-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'),
};

// "Nxf7" → knight figurine + "xf7", the way chess books print it.
const FIGURINES = { N: "ln", B: "lb", R: "lr", Q: "lq", K: "lk" };
export function figurine(san) {
  const piece = FIGURINES[san[0]];
  if (!piece) return html`${san}`;
  return html`<img class="figurine" src="assets/pieces/${piece}.svg" alt="${san[0]}" width="16" height="16">${san.slice(1)}`;
}
