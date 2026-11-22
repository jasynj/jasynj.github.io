// Projects: a row for each category, three cards across. Every card opens the details modal.
// Empty categories are hidden; a project with an unknown category lands in "Other projects".

import { html, ICONS } from "../util.js";
import { registerDetails } from "../modal.js";
import { linkButtons } from "./shared.js";
import { thumbnail, stage } from "./media.js";

const NO_DEMO = "Demo coming soon";
const keyOf = (project) => `project-${project.id}`;

function groupByCategory(projects, categories) {
  const known = new Set(categories.map((c) => c.id));
  return [
    ...categories.map((c) => ({ label: c.label, items: projects.filter((p) => p.category === c.id) })),
    { label: "Other projects", items: projects.filter((p) => !known.has(p.category)) },
  ].filter((group) => group.items.length);
}

function card(project, category) {
  return html`<button type="button" class="reel-card" data-detail="${keyOf(project)}" aria-haspopup="dialog">
    ${thumbnail({ demo: project.demo, image: project.image, note: NO_DEMO })}
    <span class="reel-body">
      <span class="reel-name">${project.name}</span>
      <span class="reel-sub">${category}${project.context ? html` · ${project.context}` : ""}</span>
      ${project.stack.length ? html`<span class="tag-list">${project.stack.slice(0, 3).map((s) => html`<span class="tag">${s}</span>`)}</span>` : ""}
      <span class="visually-hidden">${project.demo ? "Has a demo" : NO_DEMO}</span>
    </span>
  </button>`;
}

function row({ label, items }) {
  return html`<div class="project-row">
    <div class="project-row-head">
      <h3 class="project-row-title">${label}<span class="project-count">${items.length}</span></h3>
      <div class="project-arrows" hidden>
        <button type="button" class="icon-button" data-step="-1" aria-label="${`Previous in ${label}`}">${ICONS.previous}</button>
        <button type="button" class="icon-button" data-step="1" aria-label="${`Next in ${label}`}">${ICONS.next}</button>
      </div>
    </div>
    <div class="project-track" role="group" aria-label="${label}">${items.map((project) => card(project, label))}</div>
  </div>`;
}

function details(project, category) {
  const links = linkButtons(project.links, project.name);
  return html`${stage({ demo: project.demo, image: project.image, note: NO_DEMO, title: project.name })}
    <div class="detail">
      <h2 class="detail-title" id="detail-title">${project.name}</h2>
      <p class="detail-context">${category}${project.context ? html` · ${project.context}` : ""}</p>
      <div class="detail-main">
        <p>${project.summary}</p>
        ${project.outcome ? html`<p class="detail-label">Outcome</p><p>${project.outcome}</p>` : ""}
      </div>
      <div class="detail-side">
        ${project.stack.length ? html`<div><p class="detail-label">Stack</p><ul class="tag-list">${project.stack.map((s) => html`<li class="tag">${s}</li>`)}</ul></div>` : ""}
        ${links.length ? html`<div class="detail-links">${links}</div>` : ""}
      </div>
    </div>`;
}

// The arrows only appear when a row has more cards than fit.
function initRow(element) {
  const track = element.querySelector(".project-track");
  const arrows = element.querySelector(".project-arrows");
  const [back, forward] = arrows.querySelectorAll("button");

  const update = () => {
    arrows.hidden = track.scrollWidth <= track.clientWidth + 2;
    back.disabled = track.scrollLeft < 8;
    forward.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  };
  for (const button of [back, forward]) {
    button.addEventListener("click", () => {
      const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
      track.scrollBy({ left: Number(button.dataset.step) * track.clientWidth * 0.85, behavior });
    });
  }
  track.addEventListener("scroll", update, { passive: true });
  new ResizeObserver(update).observe(track);
}

export function renderProjects(root, projects, categories) {
  const groups = groupByCategory(projects, categories);
  root.innerHTML = groups.map(row).join("");
  root.querySelectorAll(".project-row").forEach(initRow);
  registerDetails(groups.flatMap(({ label, items }) => items.map((project) => [keyOf(project), () => details(project, label)])));
}
