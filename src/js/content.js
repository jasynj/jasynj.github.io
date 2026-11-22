// Loads data/content.json and turns it into the shape the renderers expect.
// This is the contract a backend writes to: see data/README.md and data/schema.json.
// Invalid blocks are skipped with a console warning instead of breaking the page.

import { byStartDesc } from "./util.js";

const REQUIRED = {
  experience: ["id", "kind", "role", "org", "start"],
  project: ["id", "name", "category", "summary"],
};
const LINK_KINDS = new Set(["live", "code"]);
const FOCUS = /^\d{1,3}% \d{1,3}%$/;
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

/* Demos -----------------------------------------------------------------------
   A demo is just a URL. Its provider decides how the modal plays it:
   youtube and file autoplay muted, drive shows Drive's own player (which can't
   autoplay), and anything else opens in a new tab. */

const YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/;
const DRIVE = /drive\.google\.com\/(?:file\/d\/|(?:open|uc)\?(?:[^#]*&)?id=)([\w-]+)/;
const VIDEO_FILE = /\.(?:mp4|m4v|webm|mov)(?:[?#]|$)/i;

function resolveVideo(url) {
  const youtube = url.match(YOUTUBE)?.[1];
  if (youtube) {
    return {
      provider: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtube}?playsinline=1&rel=0`,
      poster: `https://img.youtube.com/vi/${youtube}/hqdefault.jpg`,
    };
  }
  const drive = url.match(DRIVE)?.[1];
  if (drive) {
    return {
      provider: "drive",
      embedUrl: `https://drive.google.com/file/d/${drive}/preview`,
      poster: `https://drive.google.com/thumbnail?id=${drive}&sz=w800`,
    };
  }
  if (VIDEO_FILE.test(url)) return { provider: "file", embedUrl: url, poster: null };
  return { provider: "other", embedUrl: null, poster: null };
}

function normalizeDemo(demo) {
  if (!demo?.url) return null;
  const { provider, embedUrl, poster } = resolveVideo(String(demo.url));
  return {
    url: demo.url,
    label: demo.label || "Watch the demo",
    thumbnail: demo.thumbnail || poster,
    provider,
    embedUrl,
  };
}

// `focus` ends up in a style attribute, so only two percentages get through.
function normalizeImage(image) {
  if (!image?.src) return null;
  return { ...image, alt: image.alt ?? "", focus: FOCUS.test(image.focus ?? "") ? image.focus : null };
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
    cover: normalizeImage(block.cover),
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
    image: normalizeImage(block.image),
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
