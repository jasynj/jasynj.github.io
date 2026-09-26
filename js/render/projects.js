// Projects: one equal row each. The row shows the name, what it is, and the result;
// click to expand the full story, stack, links, and demo. One open at a time.

import { html, ICONS } from "../util.js";
import { linkButtons, demoCard } from "./shared.js";

function projectRow(project, index) {
  const links = linkButtons(project.links, project.name);
  const panelId = `project-${project.id}-detail`;
  return html`<li class="project" id="project-${project.id}" data-disclosure>
    <div class="project-row" data-disclosure-row>
      <span class="project-no" aria-hidden="true">${index + 1}.</span>
      <div class="project-title">
        <h3 class="project-name">
          <button type="button" class="project-button" aria-expanded="false" aria-controls="${panelId}" data-group="projects">${project.name}</button>
        </h3>
        ${project.context ? html`<p class="project-context">${project.context}</p>` : ""}
      </div>
      <p class="project-result">${project.outcome || project.summary}</p>
      <span class="project-toggle" aria-hidden="true">${ICONS.toggle}</span>
    </div>
    <div class="project-panel" id="${panelId}" hidden>
      <div class="project-detail">
        <div class="project-copy">
          <p class="project-summary">${project.summary}</p>
          ${project.stack.length ? html`<p class="project-stack">${project.stack.join(" · ")}</p>` : ""}
          ${links.length ? html`<div class="project-links">${links}</div>` : ""}
        </div>
        ${project.demo ? html`<div class="project-demo">${demoCard(project.demo, project.name)}</div>` : ""}
      </div>
    </div>
  </li>`;
}

export function renderProjects(root, projects) {
  root.innerHTML = projects.map(projectRow).join("");
}
