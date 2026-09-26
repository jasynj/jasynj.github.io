// Entry point. Content lives in data/content.json (schema: data/schema.json);
// adding an experience or project means adding a block there, not editing code.

import { loadContent } from "./js/content.js";
import { renderHero } from "./js/render/hero.js";
import { renderExperience } from "./js/render/experience.js";
import { renderProjects } from "./js/render/projects.js";
import { renderAbout, renderSkills } from "./js/render/profile.js";
import { initDisclosures, openFromHash } from "./js/disclosure.js";
import { initDrafter } from "./js/drafter.js";

const CONTENT_URL = "data/content.json";
const $ = (selector) => document.querySelector(selector);

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
initDrafter($("[data-drafter]"));
initDisclosures(document.body);
window.addEventListener("hashchange", openFromHash);

// "Draft an email" lands you in the drafter itself, ready to type.
document.querySelectorAll('a[href="#contact"]').forEach((link) =>
  link.addEventListener("click", () => {
    setTimeout(() => document.getElementById("draft-name")?.focus({ preventScroll: true }), 600);
  })
);

try {
  const content = await loadContent(CONTENT_URL);

  renderHero(
    {
      board: $("[data-board]"),
      caption: $("[data-render='opening']"),
      photo: $("[data-render='hero-photo']"),
      facts: $("[data-render='hero-facts']"),
      schedule: $("[data-schedule]"),
    },
    content.profile
  );
  renderExperience({ work: $("[data-render='work']"), programs: $("[data-render='programs']") }, content);
  renderProjects({ tabs: $("[data-render='project-tabs']"), panels: $("[data-render='projects']") }, content.projects, content.projectCategories);
  renderAbout(
    { photo: $("[data-render='about-photo']"), about: $("[data-render='about']"), facts: $("[data-render='facts']") },
    content.profile,
    content.leadership
  );
  renderSkills($("[data-render='skills']"), content.skills);
  openFromHash();
} catch (err) {
  console.error("Could not load site content:", err);
  document.querySelectorAll("[data-render]").forEach((el) => {
    el.innerHTML = `<p class="load-error">This section couldn't load. The <a href="assets/resumes/Chimdinma_Jason.pdf">resume</a> has everything.</p>`;
  });
}
