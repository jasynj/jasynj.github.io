# Site content

Everything on the page comes from `content.json`: experience, programs, projects, leadership, skills,
and the profile. To add something, add a block to the right array. You never touch HTML or JS.

`schema.json` is the contract (JSON Schema, draft 2020-12). A backend or admin form should produce a
`content.json` that validates against it. The site also checks each block when it loads
(`js/content.js`): a block missing a required field is skipped and logged in the browser console,
and the rest of the page still renders.

## How the code is laid out

| File | Job |
| --- | --- |
| `js/content.js` | Loads `content.json`, fills in defaults, skips invalid blocks, sorts. **The only place that knows the data shape.** |
| `js/render/hero.js` | First screen: photo, key facts, buttons |
| `js/board.js` | The decorative board that loops through chess openings |
| `js/render/experience.js` | Work timeline + Programs & hackathons |
| `js/render/projects.js` | The project list |
| `js/render/profile.js` | About and Skills |
| `js/render/shared.js` | Link buttons and the demo card |
| `js/disclosure.js` | Click-to-expand rows |
| `js/util.js` | Escaping `html` templates, URL safety, dates, icons |

Every renderer takes normalized data and returns markup through the `html` template, which escapes
every value. Content from a backend can't inject HTML, and only `http(s)`, `mailto`, and
site-relative URLs reach an `href` or `src`.

## Conventions

- **Dates** are `"YYYY-MM"`. `"end": null` means *present*.
- **Order:** experience sorts newest first automatically. Projects show `featured` ones first, then the
  order they appear in the file.
- **Where experience shows up:** `"kind": "work"` goes in the Experience timeline;
  `"program"` and `"hackathon"` go in Programs & hackathons.
- **First screen:** `profile.facts` is the list of key facts beside your photo
  (`{ "label": "Now", "value": "…", "detail": "…" }`). `profile.heroPhoto` sets the photo (it falls
  back to `aboutPhoto`). `profile.schedule` is your booking link for "Schedule a meeting"; leave it
  empty and the button opens a meeting-request email instead.
- **Links** only render when they exist. `kind` is `live`, `code`, or `article`.
- **Demos** go in `demo`, not `links` (see below).
- **Facts come from the current resume** (`assets/resumes/`). Don't add numbers you can't back up.

## Adding a demo

Any experience or project can have one. It shows as a small thumbnail card inside the expanded row and
opens in a new tab, so it never takes over the page.

```json
"demo": {
  "url": "https://youtu.be/VIDEO_ID",
  "thumbnail": "assets/web/meta-demo.jpg",
  "label": "Watch the demo"
}
```

- `thumbnail` is optional. YouTube links get one automatically; without one, the card shows a
  hatched placeholder with a play button.
- Put thumbnails in `assets/web/` at about 600×338 (16:9) and under ~80 KB.

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
  "summary": "One or two sentences, shown on the row.",
  "metrics": [{ "value": "~22M", "label": "records processed" }],
  "highlights": ["Full bullet, shown when the row is opened."],
  "tags": ["Data pipelines"],
  "logos": [{ "src": "assets/logos/meta.png", "alt": "Meta" }],
  "media": [{ "src": "assets/web/…", "alt": "…" }],
  "links": [{ "kind": "article", "url": "https://…" }],
  "demo": { "url": "https://…" }
}
```

## Project block

```json
{
  "id": "cee",
  "name": "Craig Events & Entertainments",
  "featured": true,
  "context": "Client work · Live",
  "summary": "What it is, in two sentences.",
  "outcome": "The result: users, clients, numbers. Shown on the collapsed row.",
  "stack": ["React", "Next.js"],
  "links": [
    { "kind": "live", "url": "https://…" },
    { "kind": "code", "url": "https://github.com/…" }
  ],
  "demo": { "url": "https://…", "thumbnail": "assets/web/…" }
}
```

## Other blocks

- `leadership`: `{ "role": "…", "org": "…" }`
- `skills`: `{ "group": "Languages", "items": ["Python", "…"] }`
- `profile`: name, tagline, email, resume path, photos, `facts`, `schedule`, education, honors, and `about` paragraphs.

## Previewing locally

The page loads this file with `fetch`, which browsers block on `file://`. Serve the folder instead:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
