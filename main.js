// Renders every content block from data/content.json.
// Adding an experience, project, or skill means editing that file, not this one.

const CONTENT_URL = "data/content.json";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LINK_LABELS = { live: "Live site", demo: "Demo", code: "Code" };

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

function logosHtml(logos = []) {
  return `<div class="exp-logo-wrap${logos.length > 1 ? " double" : ""}">
    ${logos.map((l) => `<img class="exp-logo" src="${esc(l.src)}" alt="${esc(l.alt)}" width="36" height="36" loading="lazy">`).join("")}
  </div>`;
}

function experienceCard(item) {
  const hasDetail = (item.highlights && item.highlights.length) || (item.media && item.media.length);
  return `<article class="experience-card">
    ${logosHtml(item.logos)}
    <h3>${esc(item.role)}</h3>
    <p class="exp-org">${esc(item.org)}${item.team ? ` · ${esc(item.team)}` : ""}</p>
    <p class="exp-meta">${esc(item.location)} • ${formatRange(item.start, item.end)}</p>
    <p class="exp-summary">${esc(item.summary)}</p>
    ${hasDetail ? `<button type="button" class="experience-more" data-detail="${esc(item.id)}">View details ↗</button>` : ""}
  </article>`;
}

function detailDialog(item) {
  const highlights = (item.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("");
  const media = (item.media || [])
    .map((m) => `<img class="modal-media-img" src="${esc(m.src)}" alt="${esc(m.alt)}" loading="lazy">`)
    .join("");
  return `<dialog class="experience-modal-content" id="detail-${esc(item.id)}" aria-labelledby="detail-${esc(item.id)}-title">
    <h3 id="detail-${esc(item.id)}-title">${esc(item.role)} — ${esc(item.org)}</h3>
    <p>${esc(item.location)} • ${formatRange(item.start, item.end)}</p>
    ${highlights ? `<ul>${highlights}</ul>` : ""}
    ${media ? `<div class="modal-media-grid">${media}</div>` : ""}
    <form method="dialog"><button class="experience-modal-close">Close</button></form>
  </dialog>`;
}

function projectTile(project) {
  const links = (project.links || [])
    .map(
      (link, i) =>
        `<a href="${esc(link.url)}" target="_blank" rel="noopener" class="project-btn ${i === 0 ? "btn-primary" : "btn-outline"}">${LINK_LABELS[link.kind] || "Link"}</a>`
    )
    .join("");
  return `<article class="project-tile">
    <div class="project-img-container">
      <img class="project-img" src="${esc(project.image.src)}" alt="${esc(project.image.alt)}" loading="lazy">
    </div>
    <div class="project-info">
      <h3>${esc(project.name)}</h3>
      <p>${esc(project.summary)}</p>
      ${project.outcome ? `<p class="project-outcome">${esc(project.outcome)}</p>` : ""}
      <div class="project-buttons">${links}</div>
    </div>
  </article>`;
}

function skillsHtml(groups) {
  return `<div class="skills-card">${groups
    .map(
      (g) => `<h3 class="skills-category">${esc(g.group)}</h3>
      <ul class="skills-list">${g.items.map((s) => `<li class="skill-chip">${esc(s)}</li>`).join("")}</ul>`
    )
    .join("")}</div>`;
}

function render(content) {
  const work = content.experience.filter((e) => e.kind === "work").sort(byStartDesc);
  const programs = content.experience.filter((e) => e.kind !== "work").sort(byStartDesc);

  document.querySelector("[data-render='about']").innerHTML = content.profile.about
    .map((p) => `<p class="about-text">${esc(p)}</p>`)
    .join("");
  document.querySelector("[data-render='work']").innerHTML = work.map(experienceCard).join("");
  document.querySelector("[data-render='programs']").innerHTML = programs.map(experienceCard).join("");
  document.querySelector("[data-render='details']").innerHTML = content.experience.map(detailDialog).join("");
  document.querySelector("[data-render='projects']").innerHTML = content.projects.map(projectTile).join("");
  document.querySelector("[data-render='skills']").innerHTML = skillsHtml(content.skills);
}

function bindTabs() {
  const tabs = document.querySelectorAll(".experience-tab");
  const panels = document.querySelectorAll(".experience-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => panel.classList.toggle("is-active", panel.id === tab.getAttribute("aria-controls")));
    });
  });
}

function bindDetails() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-detail]");
    if (trigger) document.getElementById(`detail-${trigger.dataset.detail}`)?.showModal();

    // Click on the backdrop closes the dialog.
    if (e.target instanceof HTMLDialogElement) e.target.close();
  });
}

function bindLightbox() {
  const lightbox = document.createElement("dialog");
  lightbox.className = "lightbox";
  document.body.appendChild(lightbox);

  document.addEventListener("click", (e) => {
    if (!e.target.matches(".modal-media-img")) return;
    lightbox.innerHTML = `<img class="lightbox-img" src="${esc(e.target.src)}" alt="${esc(e.target.alt)}">
      <form method="dialog"><button class="lightbox-close" aria-label="Close image">✕</button></form>`;
    lightbox.showModal();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  bindTabs();
  bindDetails();
  bindLightbox();

  try {
    const res = await fetch(CONTENT_URL);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    render(await res.json());
  } catch (err) {
    console.error("Could not load site content:", err);
    document.querySelectorAll("[data-render]").forEach((el) => {
      el.innerHTML = `<p class="load-error">This section couldn't load. The <a href="assets/resumes/Chimdinma_Jason.pdf">resume</a> has everything.</p>`;
    });
  }
});
