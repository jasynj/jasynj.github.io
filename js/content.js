// Loads data/content.json and turns it into the shape the renderers expect.
// This is the contract a backend writes to: see data/README.md and data/schema.json.
// Invalid blocks are skipped with a console warning instead of breaking the page.

import { byStartDesc } from "./util.js";

const REQUIRED = {
  experience: ["id", "kind", "role", "org", "start"],
  project: ["id", "name", "category", "summary"],
};
const LINK_KINDS = new Set(["live", "code"]);
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
    ...block,
    links: normalizeLinks(block.links),
    demo: normalizeDemo(block.demo),
  };
}

function normalizeProject(block, categoryIds) {
  if (!categoryIds.has(block.category)) {
    warn(`project "${block.id}" has category "${block.category}", which isn't in projectCategories`, block);
  }
  return {
    context: "",
    outcome: "",
    stack: [],
    ...block,
    links: normalizeLinks(block.links),
    demo: normalizeDemo(block.demo),
  };
}

export function normalizeContent(raw) {
  const experience = (raw.experience ?? [])
    .filter((block) => hasRequired(block, REQUIRED.experience, "experience"))
    .map(normalizeExperience);

  const projectCategories = (raw.projectCategories ?? []).filter((c) => c?.id && c?.label);
  const categoryIds = new Set(projectCategories.map((c) => c.id));
  const projects = (raw.projects ?? [])
    .filter((block) => hasRequired(block, REQUIRED.project, "project"))
    .map((block) => normalizeProject(block, categoryIds));

  return {
    profile: raw.profile ?? {},
    work: experience.filter((e) => e.kind === "work").sort(byStartDesc),
    programs: experience.filter((e) => e.kind !== "work").sort(byStartDesc),
    // Projects keep the order they appear in the file.
    projects,
    projectCategories,
    leadership: raw.leadership ?? [],
    skills: raw.skills ?? [],
  };
}

export async function loadContent(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return normalizeContent(await res.json());
}
