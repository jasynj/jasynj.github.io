// Loads data/content.json and turns it into the shape the renderers expect.
// This is the contract a backend writes to: see data/README.md and data/schema.json.
// Invalid blocks are skipped with a console warning instead of breaking the page.

import { byStartAsc, byStartDesc } from "./util.js";

const REQUIRED = {
  experience: ["id", "kind", "role", "org", "start"],
  project: ["id", "name", "summary"],
};
const LINK_KINDS = new Set(["live", "code", "demo", "article"]);
const YM = /^\d{4}-(0[1-9]|1[0-2])$/;

function warn(message, block) {
  console.warn(`[content] ${message}`, block);
}

function hasRequired(block, fields, type) {
  const missing = fields.filter((field) => block?.[field] === undefined || block[field] === "");
  if (missing.length) {
    warn(`${type} "${block?.id ?? "?"}" skipped: missing ${missing.join(", ")}`, block);
    return false;
  }
  return true;
}

// YouTube demos get a thumbnail for free.
function youtubeThumbnail(url) {
  const match = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

function normalizeDemo(demo) {
  if (!demo?.url) return null;
  return {
    url: demo.url,
    label: demo.label || "Watch the demo",
    thumbnail: demo.thumbnail || youtubeThumbnail(demo.url),
  };
}

function normalizeLinks(links = []) {
  return links.filter((link) => link?.url && LINK_KINDS.has(link.kind));
}

// A block may carry its demo either as `demo` or as a legacy `{ kind: "demo" }` link.
function splitDemo(block) {
  const links = normalizeLinks(block.links);
  const legacy = links.find((link) => link.kind === "demo");
  return {
    demo: normalizeDemo(block.demo) || normalizeDemo(legacy),
    links: links.filter((link) => link.kind !== "demo"),
  };
}

function normalizeExperience(block) {
  if (!YM.test(block.start) || (block.end && !YM.test(block.end))) {
    warn(`experience "${block.id}" has a date that isn't YYYY-MM`, block);
  }
  return {
    team: "",
    location: "",
    end: null,
    summary: "",
    logos: [],
    metrics: [],
    highlights: [],
    tags: [],
    media: [],
    mainline: false,
    featured: false,
    ...block,
    ...splitDemo(block),
  };
}

function normalizeProject(block) {
  return {
    context: "",
    outcome: "",
    stack: [],
    featured: false,
    ...block,
    ...splitDemo(block),
  };
}

export function normalizeContent(raw) {
  const experience = (raw.experience ?? [])
    .filter((block) => hasRequired(block, REQUIRED.experience, "experience"))
    .map(normalizeExperience);

  const projects = (raw.projects ?? [])
    .filter((block) => hasRequired(block, REQUIRED.project, "project"))
    .map(normalizeProject);

  return {
    profile: raw.profile ?? {},
    work: experience.filter((e) => e.kind === "work").sort(byStartDesc),
    programs: experience.filter((e) => e.kind !== "work").sort(byStartDesc),
    mainline: experience.filter((e) => e.mainline).sort(byStartAsc),
    // Featured projects first; otherwise the order they appear in the file.
    projects: [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)],
    leadership: raw.leadership ?? [],
    skills: raw.skills ?? [],
  };
}

export async function loadContent(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return normalizeContent(await res.json());
}
