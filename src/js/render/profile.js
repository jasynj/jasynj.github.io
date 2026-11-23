// About (the player card) and Skills (the repertoire).

import { html, safeUrl } from "../util.js";

export function renderAbout({ photo, about, facts }, profile, leadership) {
  const src = safeUrl(profile.aboutPhoto?.src);
  photo.innerHTML = src
    ? html`<img src="${src}" alt="${profile.aboutPhoto.alt ?? ""}" width="1000" height="1294" loading="lazy" decoding="async">`.value
    : "";
  about.innerHTML = (profile.about ?? []).map((p) => html`<p>${p}</p>`).join("");

  const ed = profile.education ?? {};
  const list = (items) => html`<ul>${items.map((item) => html`<li>${item}</li>`)}</ul>`;
  facts.innerHTML = html`
    <div><dt>Education</dt><dd>${ed.school}<br>${ed.degree}<br><span class="fact-mono">GPA ${ed.gpa} · ${ed.graduation}</span></dd></div>
    ${profile.honors?.length ? html`<div><dt>Honors</dt><dd>${list(profile.honors)}</dd></div>` : ""}
    ${leadership.length ? html`<div><dt>Leadership</dt><dd>${list(leadership.map((l) => `${l.role}, ${l.org}`))}</dd></div>` : ""}
    ${ed.coursework?.length ? html`<div><dt>Coursework</dt><dd>${ed.coursework.join(" · ")}</dd></div>` : ""}`.value;
}

export function renderSkills(root, groups) {
  root.innerHTML = groups
    .map(
      (g) => html`<div class="repertoire-group">
        <h3>${g.group}</h3>
        <ul>${g.items.map((s) => html`<li>${s}</li>`)}</ul>
      </div>`
    )
    .join("");
}
