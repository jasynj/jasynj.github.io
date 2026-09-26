// Renders every content block from data/content.json.
// Adding an experience, project, or skill means editing that file, not this one.

import { createBoard, assignMoves } from "./js/board.js";
import { initDrafter } from "./js/drafter.js";

const CONTENT_URL = "data/content.json";
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LINK_LABELS = { live: "Live site", demo: "Demo", code: "Code" };
const FIGURINES = { N: "ln", B: "lb", R: "lr", Q: "lq", K: "lk" };

const esc = (value = "") =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function formatMonth(ym) {
  const [year, month] = ym.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

function formatRange(start, end) {
  if (!end) return `${formatMonth(start)} – Present`;
  if (start === end) return formatMonth(start);
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}

const byStartDesc = (a, b) => b.start.localeCompare(a.start);
const byStartAsc = (a, b) => a.start.localeCompare(b.start);

// "Nxf7" → knight figurine + "xf7", the way chess books print it.
function figurine(san) {
  const piece = FIGURINES[san[0]];
  if (!piece) return esc(san);
  return `<img src="assets/pieces/${piece}.svg" alt="${esc(san[0])}" width="16" height="16">${esc(san.slice(1))}`;
}

/* The game on the first screen ------------------------------------------- */

function moveRow({ entry, number, san, ply }) {
  const brilliant = entry.glyph === "!!";
  const glyph = entry.glyph
    ? `<span class="glyph${brilliant ? " glyph-brilliant" : ""}" aria-label="${brilliant ? "brilliant move" : "good move"}">${esc(entry.glyph)}</span>`
    : "";
  return `<li class="move${brilliant ? " is-brilliant" : ""}" data-ply="${ply}">
    <a href="#exp-${esc(entry.id)}">
      <span class="move-no">${number}.</span>
      <span class="move-san">${figurine(san)}${glyph}</span>
      <span class="move-what">
        <span class="move-org">${esc(entry.org)}</span>
        <span class="move-role">${entry.start.slice(0, 4)} · ${esc(entry.role)}</span>
      </span>
      <span class="move-proof">${esc(entry.proof || "")}</span>
    </a>
  </li>`;
}

function renderGame(content) {
  const mainline = content.experience.filter((e) => e.mainline).sort(byStartAsc);
  const moves = assignMoves(mainline);
  const list = document.querySelector("[data-render='moves']");
  list.innerHTML = moves.map(moveRow).join("");

  const evalFill = document.querySelector(".eval-fill");
  const rows = [...list.querySelectorAll(".move")];
  const brilliantPly = moves.find((m) => m.entry.glyph === "!!")?.ply;

  const board = createBoard(document.querySelector("[data-board]"), {
    // White's edge grows as the game goes on; the bar is the story, not a number.
    onPly: (ply) => {
      evalFill.style.height = `${50 + (ply / board.plies) * 38}%`;
      rows.forEach((row) => row.classList.toggle("is-current", Number(row.dataset.ply) === ply));
    },
  });

  const finalPly = moves.at(-1).ply;
  const show = (ply) => board.setPly(ply, { brilliant: ply === brilliantPly });

  rows.forEach((row) => {
    const ply = Number(row.dataset.ply);
    const link = row.querySelector("a");
    link.addEventListener("mouseenter", () => show(ply));
    link.addEventListener("focus", () => show(ply));
  });
  list.addEventListener("mouseleave", () => show(finalPly));
  list.addEventListener("focusout", (e) => {
    if (!list.contains(e.relatedTarget)) show(finalPly);
  });

  // Play the game through once, landing on the latest move.
  if (REDUCED_MOTION) {
    show(finalPly);
  } else {
    let ply = 0;
    show(0);
    const step = () => {
      ply += 1;
      show(ply);
      if (ply < finalPly) setTimeout(step, ply % 2 ? 380 : 520);
    };
    setTimeout(step, 500);
  }
}

/* Experience: the annotated game ------------------------------------------ */

function monthsBetween(start, end) {
  const [y1, m1] = start.split("-").map(Number);
  const now = new Date();
  const [y2, m2] = end ? end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  return Math.max(1, (y2 - y1) * 12 + (m2 - m1) + 1);
}

function durationLabel(months) {
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years} yr ${rest} mo` : `${years} yr`;
}

function annotationBody(item) {
  const metrics = (item.metrics || [])
    .map((m) => `<li><span class="metric-value">${esc(m.value)}</span> <span class="metric-label">${esc(m.label)}</span></li>`)
    .join("");
  const highlights = (item.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("");
  const media = (item.media || [])
    .map(
      (m) =>
        `<a class="evidence" href="${esc(m.src)}" target="_blank" rel="noopener"><img src="${esc(m.src)}" alt="${esc(m.alt)}" loading="lazy"></a>`
    )
    .join("");
  const logos = (item.logos || [])
    .map((l) => `<img src="${esc(l.src)}" alt="${esc(l.alt)}" width="32" height="32" loading="lazy">`)
    .join("");
  return `
    <div class="ann-head">
      <span class="ann-logos">${logos}</span>
      <div>
        <h3 class="ann-org">${esc(item.org)}</h3>
        <p class="ann-role">${esc(item.role)}${item.team ? ` · ${esc(item.team)}` : ""}</p>
      </div>
    </div>
    <p class="ann-summary">${esc(item.summary)}</p>
    ${metrics ? `<ul class="ann-metrics">${metrics}</ul>` : ""}
    ${
      highlights || media
        ? `<details class="ann-notes">
            <summary>Full notes</summary>
            ${highlights ? `<ul class="ann-highlights">${highlights}</ul>` : ""}
            ${media ? `<div class="ann-evidence">${media}</div>` : ""}
          </details>`
        : ""
    }`;
}

function clockColumn(item) {
  const months = monthsBetween(item.start, item.end);
  return `<div class="ann-clock">
    <span class="ann-dates">${formatRange(item.start, item.end)}</span>
    <span class="ann-bar" style="--months:${months}" aria-hidden="true"></span>
    <span class="ann-duration">${durationLabel(months)} · ${esc(item.location)}</span>
  </div>`;
}

function renderAnnotations(content) {
  const mainline = content.experience.filter((e) => e.mainline).sort(byStartAsc);
  const moves = assignMoves(mainline);
  const side = content.experience.filter((e) => !e.mainline).sort(byStartDesc);

  // A side variation hangs off the latest main move that started on or before it.
  const variationsFor = (move, next) =>
    side.filter((v) => v.start >= move.entry.start && (!next || v.start < next.entry.start));

  const earliest = side.filter((v) => v.start < moves[0].entry.start);

  const html = moves
    .map((move, i) => {
      const next = moves[i + 1];
      const brilliant = move.entry.glyph === "!!";
      const variations = variationsFor(move, next)
        .map((v) => `<li class="variation" id="exp-${esc(v.id)}">${clockColumn(v)}<div class="ann-body">${annotationBody(v)}</div></li>`)
        .join("");
      return {
        html: `<li class="annotation${brilliant ? " is-brilliant" : ""}" id="exp-${esc(move.entry.id)}">
          <p class="ann-move">
            <span class="ann-no">${move.number}.</span>
            <span class="ann-san">${figurine(move.san)}${move.entry.glyph ? `<span class="glyph${brilliant ? " glyph-brilliant" : ""}">${esc(move.entry.glyph)}</span>` : ""}</span>
          </p>
          ${clockColumn(move.entry)}
          <div class="ann-body">${annotationBody(move.entry)}</div>
          ${variations ? `<ol class="variations" aria-label="Side variations">${variations}</ol>` : ""}
        </li>`,
      };
    })
    .reverse()
    .map((m) => m.html)
    .join("");

  const opening = earliest.length
    ? `<li class="annotation annotation-opening"><ol class="variations" aria-label="Before the game">${earliest
        .map((v) => `<li class="variation" id="exp-${esc(v.id)}">${clockColumn(v)}<div class="ann-body">${annotationBody(v)}</div></li>`)
        .join("")}</ol></li>`
    : "";

  document.querySelector("[data-render='annotations']").innerHTML = html + opening;
}

/* Projects: key positions and more lines ---------------------------------- */

function projectLinks(project) {
  return (project.links || [])
    .map(
      (link) =>
        `<a class="btn btn-line" href="${esc(link.url)}" target="_blank" rel="noopener">${LINK_LABELS[link.kind] || "Link"}<span class="visually-hidden"> for ${esc(project.name)}</span></a>`
    )
    .join("");
}

function positionCard(project) {
  return `<article class="position">
    <figure class="position-diagram">
      <img src="${esc(project.image.src)}" alt="${esc(project.image.alt)}" loading="lazy">
    </figure>
    <p class="position-context">${esc(project.context)}</p>
    <h3 class="position-name">${esc(project.name)}</h3>
    <p class="position-summary">${esc(project.summary)}</p>
    ${project.outcome ? `<p class="position-outcome">${esc(project.outcome)}</p>` : ""}
    ${project.stack?.length ? `<p class="position-stack">${project.stack.map(esc).join(" · ")}</p>` : ""}
    <div class="position-links">${projectLinks(project)}</div>
  </article>`;
}

function lineRow(project) {
  return `<li class="line">
    <div class="line-name">
      <h4>${esc(project.name)}</h4>
      <p>${esc(project.context)}</p>
    </div>
    <p class="line-summary">${esc(project.summary)}</p>
    <div class="line-links">${projectLinks(project)}</div>
  </li>`;
}

/* About and skills ---------------------------------------------------------- */

function renderPlayer(profile, leadership) {
  document.querySelector("[data-render='about-photo']").innerHTML = `<img src="${esc(profile.aboutPhoto.src)}" alt="${esc(
    profile.aboutPhoto.alt
  )}" width="1545" height="2000" loading="lazy">`;
  document.querySelector("[data-render='about']").innerHTML = profile.about.map((p) => `<p>${esc(p)}</p>`).join("");

  const ed = profile.education;
  const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
  document.querySelector("[data-render='facts']").innerHTML = `
    <div><dt>Education</dt><dd>${esc(ed.school)}<br>${esc(ed.degree)}<br><span class="fact-mono">GPA ${esc(ed.gpa)} · ${esc(ed.graduation)}</span></dd></div>
    <div><dt>Honors</dt><dd>${list(profile.honors.map(esc))}</dd></div>
    <div><dt>Leadership</dt><dd>${list(leadership.map((l) => `${esc(l.role)}, ${esc(l.org)}`))}</dd></div>
    <div><dt>Coursework</dt><dd>${esc(ed.coursework.join(" · "))}</dd></div>`;
}

function renderSkills(groups) {
  document.querySelector("[data-render='skills']").innerHTML = groups
    .map(
      (g) => `<div class="repertoire-group">
        <h3>${esc(g.group)}</h3>
        <ul>${g.items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>`
    )
    .join("");
}

function renderSections(content) {
  renderAnnotations(content);
  document.querySelector("[data-render='featured-projects']").innerHTML = content.projects
    .filter((p) => p.featured)
    .map(positionCard)
    .join("");
  document.querySelector("[data-render='more-projects']").innerHTML = content.projects
    .filter((p) => !p.featured)
    .map(lineRow)
    .join("");
  renderPlayer(content.profile, content.leadership);
  renderSkills(content.skills);
}

/* Boot ---------------------------------------------------------------------- */

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
initDrafter(document.querySelector("[data-drafter]"));

try {
  const res = await fetch(CONTENT_URL);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const content = await res.json();
  renderGame(content);
  renderSections(content);
} catch (err) {
  console.error("Could not load site content:", err);
  document.querySelectorAll("[data-render]").forEach((el) => {
    el.innerHTML = `<p class="load-error">This section couldn't load. The <a href="assets/resumes/Chimdinma_Jason.pdf">resume</a> has everything.</p>`;
  });
}
