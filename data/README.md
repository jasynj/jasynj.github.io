# Site content

Everything on the page (experience, programs, projects, leadership, skills, profile) comes from
`content.json`. To add something, add a block to the right array. You never touch HTML.

This is also the contract a future backend or admin form should write to. Every block is plain JSON,
so the form only has to append an object in the shape below.

## Conventions

- **Dates** are `"YYYY-MM"`. `"end": null` means *present*.
- **Order**: experience is sorted newest-first by `start` automatically; projects keep array order.
- **`featured: true`** promotes a block to the top tier. Featured experience and projects are what
  recruiters see first; keep it to the strongest three or four.
- **Images** are paths relative to the site root. Every image needs a real `alt`.
- **Links** only render when they exist. Omit a link rather than leaving it empty.
- **The main line** (`mainline: true`) is the career game on the first screen. Each mainline entry
  plays as one white move, oldest first, and the newest always lands as the final move. Keep it to
  the moves that matter most (six fit the board's line). Everything else still appears below as a
  side variation.
- **Facts come from the current resume** (`assets/resumes/`). Don't add numbers you can't back up.

## Experience block

```json
{
  "id": "meta-2026",                 // unique, kebab-case
  "kind": "work",                    // work | program | hackathon
  "featured": true,
  "role": "Software Engineering Intern",
  "org": "Meta",
  "team": "Messenger Data Use",      // optional
  "logos": [{ "src": "assets/logos/meta.png", "alt": "Meta" }],
  "location": "Menlo Park, CA",
  "start": "2026-05",
  "end": "2026-08",                  // or null
  "summary": "One or two sentences — the skim line.",
  "metrics": [{ "value": "~22M", "label": "records processed" }],   // optional, 1–4
  "highlights": ["Full bullet…"],    // optional, shown in the detail view
  "tags": ["Data pipelines"],        // optional
  "media": [{ "src": "…", "alt": "…" }],                            // optional
  "project": "fitsync",              // optional, id of a related project
  "mainline": true,                  // optional: plays as a move in the hero's game
  "glyph": "!!",                     // optional annotation: "!!" brilliant, "!" good
  "proof": "~22M records"            // mainline only: the 2–4 word result beside the move
}
```

## Project block

```json
{
  "id": "cee",
  "name": "Craig Events & Entertainments",
  "featured": true,
  "context": "Client work · Live",   // short kicker
  "summary": "What it is, in two sentences.",
  "outcome": "The result — users, clients, numbers.",   // optional
  "stack": ["React", "Next.js"],
  "image": { "src": "assets/projects-media/cee.png", "alt": "…" },
  "links": [
    { "kind": "live", "url": "https://…" },   // live | demo | code
    { "kind": "code", "url": "https://github.com/…" }
  ]
}
```

## Other blocks

- `leadership`: `{ "role": "…", "org": "…" }`
- `skills`: `{ "group": "Languages", "items": ["Python", "…"] }`
- `profile`: name, tagline, email, resume path, photos, education, honors, and `about` paragraphs.

## Previewing locally

The page loads this file with `fetch`, which browsers block on `file://`. Serve the folder instead:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
