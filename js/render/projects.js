// Projects: tabs by category (All first), then a grid of cards. Every card has a demo area:
// a thumbnail that opens the demo, or a "No demo available" placeholder.

import { html, safeUrl, ICONS } from "../util.js";
import { linkButtons } from "./shared.js";

function demoArea(project) {
  const url = safeUrl(project.demo?.url);
  if (!url) {
    return html`<div class="card-demo card-demo-empty">
      ${ICONS.noVideo}
      <span class="card-demo-note">No demo available</span>
    </div>`;
  }
  const thumbnail = safeUrl(project.demo.thumbnail);
  return html`<a class="card-demo" href="${url}" target="_blank" rel="noopener">
    ${thumbnail ? html`<img src="${thumbnail}" alt="" loading="lazy" decoding="async">` : ""}
    <span class="card-demo-play">${ICONS.play}</span>
    <span class="card-demo-label">${project.demo.label}<span class="visually-hidden"> of ${project.name} (opens in a new tab)</span></span>
  </a>`;
}

function card(project, categoryLabel) {
  const links = linkButtons(project.links, project.name);
  return html`<article class="card" id="project-${project.id}">
    ${demoArea(project)}
    <div class="card-body">
      <h3 class="card-name">${project.name}</h3>
      <p class="card-meta">${categoryLabel}${project.context ? html` · ${project.context}` : ""}</p>
      <p class="card-summary">${project.summary}</p>
      ${project.outcome ? html`<p class="card-outcome">${project.outcome}</p>` : ""}
      ${project.stack.length ? html`<ul class="card-stack">${project.stack.map((s) => html`<li>${s}</li>`)}</ul>` : ""}
      ${links.length ? html`<div class="card-links">${links}</div>` : ""}
    </div>
  </article>`;
}

function panel(id, projects, labels) {
  const body = projects.length
    ? html`<div class="card-grid">${projects.map((p) => card(p, labels.get(p.category) ?? ""))}</div>`
    : html`<p class="tab-empty">Nothing here yet.</p>`;
  return html`<div class="tab-panel" id="projects-panel-${id}" role="tabpanel" aria-labelledby="projects-tab-${id}" tabindex="0"${
    id === "all" ? "" : html` hidden`
  }>${body}</div>`;
}

export function renderProjects({ tabs, panels }, projects, categories) {
  const labels = new Map(categories.map((c) => [c.id, c.label]));
  const groups = [
    { id: "all", label: "All", items: projects },
    ...categories.map((c) => ({ ...c, items: projects.filter((p) => p.category === c.id) })),
  ];

  tabs.innerHTML = groups
    .map(
      (g, i) => html`<button type="button" role="tab" class="tab" id="projects-tab-${g.id}" aria-controls="projects-panel-${g.id}"
        aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${g.label}<span class="tab-count">${g.items.length}</span></button>`
    )
    .join("");
  panels.innerHTML = groups.map((g) => panel(g.id, g.items, labels)).join("");

  const buttons = [...tabs.querySelectorAll('[role="tab"]')];
  const indicator = document.createElement("span");
  indicator.className = "tab-indicator";
  indicator.setAttribute("aria-hidden", "true");
  tabs.append(indicator);

  // The indicator is 100px wide in CSS; transform alone moves and sizes it (no layout animation).
  function moveIndicator(button) {
    indicator.style.transform = `translateX(${button.offsetLeft - tabs.scrollLeft}px) scaleX(${button.offsetWidth / 100})`;
  }

  function select(button, { focus = false } = {}) {
    buttons.forEach((b) => {
      const on = b === button;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
    });
    moveIndicator(button);
    if (focus) button.focus();
  }

  tabs.addEventListener("click", (e) => {
    const button = e.target.closest('[role="tab"]');
    if (button) select(button);
  });

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  tabs.addEventListener("keydown", (e) => {
    const i = buttons.indexOf(document.activeElement);
    if (i < 0) return;
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: buttons.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(buttons[(next + buttons.length) % buttons.length], { focus: true });
  });

  const current = () => buttons.find((b) => b.getAttribute("aria-selected") === "true");
  tabs.addEventListener("scroll", () => moveIndicator(current()));
  requestAnimationFrame(() => moveIndicator(buttons[0]));
  window.addEventListener("resize", () => moveIndicator(current()));
}
