# Site content

Everything on the page comes from `content.json`: experience, programs, projects, leadership, skills,
and the profile. To add something, add a block to the right array. You never touch HTML or JS.

`schema.json` is the contract (JSON Schema, draft 2020-12). A backend or admin form should produce a
`content.json` that validates against it. The site also checks each block when it loads
(`src/js/content.js`): a block missing a required field is skipped and logged in the browser console,
and the rest of the page still renders.

## How the code is laid out

| File | Job |
| --- | --- |
| `src/js/content.js` | Loads `content.json`, fills in defaults, skips invalid blocks, groups and sorts experience, works out how each demo plays. **The only place that knows the data shape.** |
| `src/js/render/hero.js` | First screen: photo, key facts, buttons |
| `src/js/board.js` | The decorative board that loops through chess openings |
| `src/js/render/experience.js` | Experience cards and their details |
| `src/js/carousel.js` | The looping carousel. Knows nothing about the content |
| `src/js/render/projects.js` | Project rows, cards and their details |
| `src/js/render/media.js` | Thumbnails, and the player at the top of the modal |
| `src/js/modal.js` | The details modal, its links (`#project-cee`) and the Back button |
| `src/js/render/profile.js` | About and Skills |
| `src/js/render/shared.js` | Link buttons |
| `src/js/util.js` | Escaping `html` templates, URL safety, dates, icons |

Every renderer takes normalized data and returns markup through the `html` template, which escapes
every value. Content from a backend can't inject HTML, and only `http(s)`, `mailto`, and
site-relative URLs reach an `href` or `src`.

## Conventions

- **Dates** are `"YYYY-MM"`. `"end": null` means *present*.
- **Order:** experience sorts newest first inside each group. Projects keep the order they appear in
  the file.
- **Experience groups:** `kind` places an entry in the carousel: `"work"`, then `"program"`
  (Programs & fellowships), then `"hackathon"`, then it loops.
- **Project rows:** `projectCategories` lists the rows (`{ "id": "hackathon", "label": "Hackathons" }`).
  Each project's `category` is one of those ids. A category with no projects is hidden and appears as
  soon as a project uses it. An unknown category goes to "Other projects".
- **Pictures on cards:** a project uses `image`, an experience uses `cover` (without one, its logos).
  Both are cropped to 16:9. Add `"focus": "50% 56%"` (across, down) to choose what stays in view.
- **Summaries:** an experience's `summary` is left out of its details when the highlights already say
  at least 90% of it.
- **Linking to a card:** `#exp-<id>` and `#project-<id>` open that card's modal.
- **First screen:** `profile.facts` is the list of key facts beside your photo
  (`{ "label": "Now", "value": "…", "detail": "…" }`). `profile.photo` is the photo on the first screen and
  `profile.aboutPhoto` the one in About. `profile.schedule` is the booking link for "Schedule a meeting".
- **Links** only render when they exist. `kind` is `live` or `code`.
- **Demos** go in `demo`, not `links` (see below).
- **Facts come from the current resume** (`assets/resume/`). Don't add numbers you can't back up.

## Adding a demo

Any experience or project can have one. It becomes the card's thumbnail, and plays at the top of the
modal.

```json
"demo": {
  "url": "https://youtu.be/VIDEO_ID",
  "thumbnail": "assets/images/meta-demo.jpg",
  "label": "Watch the demo"
}
```

| `url` | Plays in the modal | Autoplays (muted) | Automatic thumbnail |
| --- | --- | --- | --- |
| YouTube | yes | yes | yes |
| `.mp4`, `.m4v`, `.webm`, `.mov` | yes | yes | no |
| Google Drive (shared "anyone with the link") | yes | no, Drive needs a click | yes |
| Anything else | no, opens in a new tab | no | no |

- Autoplay is off for visitors who asked their device for reduced motion.
- `thumbnail` is optional and always wins over the automatic one. Put it in `assets/images/` at about
  900×506 (16:9) and under ~120 KB.
- `label` is the button text for demos that open in a new tab.

Example: adding the Meta 2026 demo means adding a `demo` object to the `meta-2026` block.

## Experience block

```json
{
  "id": "meta-2026",
  "kind": "work",
  "role": "Software Engineering Intern",
  "org": "Meta",
  "team": "Messenger Data Use",
  "location": "Menlo Park, CA",
  "start": "2026-05",
  "end": "2026-08",
  "summary": "One or two sentences, shown in the details.",
  "metrics": [{ "value": "~22M", "label": "records processed" }],
  "highlights": ["Full bullet, shown in the details."],
  "tags": ["Data pipelines"],
  "cover": { "src": "assets/images/…", "alt": "…", "focus": "50% 50%" },
  "logos": [{ "src": "assets/logos/meta.png", "alt": "Meta" }],
  "media": [{ "src": "assets/images/…", "alt": "…" }],
  "links": [{ "kind": "code", "url": "https://github.com/…" }],
  "demo": { "url": "https://…" }
}
```

## Project block

```json
{
  "id": "cee",
  "name": "Craig Events & Entertainments",
  "category": "client",
  "context": "Live",
  "summary": "What it is, in two sentences.",
  "outcome": "The result: users, clients, numbers.",
  "stack": ["React", "Next.js"],
  "links": [
    { "kind": "live", "url": "https://…" },
    { "kind": "code", "url": "https://github.com/…" }
  ],
  "demo": { "url": "https://…", "thumbnail": "assets/images/…" },
  "image": { "src": "assets/images/cee.jpg", "alt": "…" }
}
```

A project's card shows, in order of preference: its `demo`, its `image`, or a "Demo coming soon"
placeholder.

## Other blocks

- `leadership`: `{ "role": "…", "org": "…" }`
- `skills`: `{ "group": "Languages", "items": ["Python", "…"] }`
- `profile`: `photo`, `aboutPhoto`, `facts`, `schedule`, `education`, `honors`, and `about` paragraphs.
  (Your name, title, tagline, and contact links are written directly in `index.html`.)

## Previewing locally

The page loads this file with `fetch`, which browsers block on `file://`. Serve the folder instead:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
