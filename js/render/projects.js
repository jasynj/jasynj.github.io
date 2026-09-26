// Projects: a knight's tour. Each project sits on a square; the list is large and quick to scan,
// the board beside it follows whichever project you're looking at. Click a row to expand the
// full story, stack, links, and demo. One open at a time.

import { html, ICONS, KNIGHT } from "../util.js";
import { knightTour, createTourBoard } from "../tour.js";
import { linkButtons, demoCard } from "./shared.js";

function projectRow(project, index, square) {
  const links = linkButtons(project.links, project.name);
  const panelId = `project-${project.id}-detail`;
  return html`<li class="project" id="project-${project.id}" data-index="${index}" data-disclosure>
    <div class="project-row" data-disclosure-row>
      <span class="project-square" aria-hidden="true"><span class="project-coord">${square}</span><span class="project-knight">${KNIGHT}</span></span>
      <div class="project-title">
        <h3 class="project-name">
          <button type="button" class="project-button" aria-expanded="false" aria-controls="${panelId}" data-group="projects">${project.name}</button>
        </h3>
        <p class="project-result">${project.outcome || project.summary}</p>
      </div>
      ${project.context ? html`<p class="project-context">${project.context}</p>` : ""}
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

export function renderProjects({ list, board }, projects) {
  const tour = knightTour(projects.length);
  list.innerHTML = projects.map((p, i) => projectRow(p, i, tour[i]?.square ?? "")).join("");
  if (!board) return;

  const boardView = createTourBoard(board, tour);
  const rows = [...list.querySelectorAll(".project")];
  let resting = 0; // where the knight returns when you stop pointing: the open project, else the first
  const nameOf = (i) => projects[i]?.name ?? "";

  const follow = (row) => row && boardView.go(Number(row.dataset.index), nameOf(Number(row.dataset.index)));
  list.addEventListener("mouseover", (e) => follow(e.target.closest(".project")));
  list.addEventListener("focusin", (e) => follow(e.target.closest(".project")));
  list.addEventListener("mouseleave", () => boardView.go(resting, nameOf(resting)));

  // Track which project is open so the knight rests there.
  new MutationObserver(() => {
    const open = rows.find((row) => row.classList.contains("is-open"));
    resting = open ? Number(open.dataset.index) : 0;
    boardView.go(resting, nameOf(resting));
  }).observe(list, { subtree: true, attributes: true, attributeFilter: ["class"] });

  boardView.go(0, nameOf(0));
}
