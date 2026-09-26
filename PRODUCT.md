# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: technical recruiters and hiring managers screening Jason for new-grad and internship software engineering roles. They skim fast, often from a link on a resume, LinkedIn, or application, and want to judge quickly whether to move him forward. The main actions are downloading the resume and making contact.

Secondary: engineers who interview him and dig into projects, code, and demos after a screen, plus potential freelance clients (small businesses like Craig Events & Entertainments) who want a site built.

## Product Purpose

The personal portfolio of Jason Chimdinma Jason, a Computer Science and Computer Information Systems double major at Grambling State University. It presents who he is, where he has worked, what he has shipped, and how to reach him. Success means a recruiter leaves convinced enough to download the resume or get in touch, and a deeper reader finds real evidence behind every claim.

## Positioning

Jason ships real products for real users. His work includes a production campus platform (the GSU Clubs & Organizations Portal) and a live client site (Craig Events & Entertainments), in addition to internship and hackathon work. Several selective programs have vetted him: Meta (SWE intern twice: Meta University 2025 and Messenger Data Use 2026), NVIDIA Summer Bridge, Google/BASTA Code2Career, and the Code2040 Fellowship. He is a design-minded engineer drawn to the point where a decision is both technically sound and visually right. A creative life outside code (painting, drawing, chess, reading) shapes how he thinks. All four of these threads are part of the claim.

## Operating Context

- Visitors reach the site from resumes, LinkedIn, job applications, and direct links. Recruiters often decide within seconds.
- It's a single long page. The reading order puts proof first: relevant experience and what he has shipped lead the page, ahead of his current role or in-progress projects (a decision the user confirmed on 2026-09-25).
- A resume PDF can be downloaded at `assets/resumes/Chimdinma_Jason.pdf`, the current version.
- Contact is an email drafter, not a form backend. A visitor picks a reason (recruiting, a project, a hello), fills in a few fields, and gets a ready-to-send draft to jasoncj.dev@gmail.com, which they can open in their mail app (mailto) or copy. It uses templates only, with no AI and no backend, and may gain an AI endpoint later once a backend exists.
- There is no Testimonials section. It was removed until real testimonials exist.

## Capabilities and Constraints

- Static HTML, CSS, and vanilla JS (`index.html`, `styles.css`, `main.js`), hosted on GitHub Pages at https://jasynj.github.io/. There is no build step.
- Content is structured as data blocks (experiences, programs, projects, skills), kept separate from markup. Adding an entry means adding one block, never hand-writing HTML. A future backend or admin form is planned to append blocks, so the block schema must stay simple and serializable (plain JSON).
- The user says the current projects, experiences and photos are partly stale. The user supplies updates; never invent content.
- The current resume is the source of truth for facts. Where the old site copy disagrees with it, the resume wins. For example, Meta University selectivity is "~4% of applicants", not the old site's "0.6% of ~15,000".

## Brand Commitments

- Name: Jason Chimdinma Jason (nav short form "Jason C. Jason"). Title: Software Engineer.
- Voice: first person, direct, grounded in real outcomes ("real clients, real users, real problems"). No inflated claims.
- Chess is a binding brand theme: the user asked for an actual chess theme across the site, not a single cursor. The chess-knight cursor stays.

## Evidence on Hand

- Photos: `assets/colorstack_headshot.jpeg` (first screen) and `assets/web/about.jpg` (Jason at Meta's Menlo Park sign, in About).
- Organization logos: `assets/logos/` (Meta, Google, NVIDIA, Mastercard, AT&T, Code2040, BASTA, AI4ALL, AUC, GSU, USC, Phillips, BeSmart, Startup School).
- Program photos: `assets/web/acc_*.jpg`, `site.jpg`, `team_picture.jpg`.
- Verifiable outcomes stated on the site: Meta University acceptance (~4% of applicants per the current resume), 4th of 62 teams at the BeSmart Hackathon, Mastercard × AUC finalist, test pass rate up 25% at Phillips Consulting, 50+ students tutored.
- Resume: `assets/resumes/Chimdinma_Jason.pdf`. Facts from it that weren't on the old site:
  - GPA 3.96 and relevant coursework (distributed systems, deep learning, AI).
  - Meta 2026 (Messenger Data Use) outcomes: an end-to-end monitoring platform processing ~22M records; flow-lookup latency cut from 15–72s to ~6.5s (~5ms core retrieval); privacy-violation detection coverage up 35%; remediation turnaround down 60%; an AI support bot.
  - The GSU Clubs & Org Portal serves 600+ users.
  - QuantSim: an event-driven TypeScript backtesting engine.
  - Reminisce: a voice-first AI memory companion (FastAPI, Gemini, Pinecone, ElevenLabs).
  - Leadership: GSU Book Club co-founder and president, ACM treasurer, ColorStack academic chair, ASA PR director, Tiger LIFT mentor.
- An older spring-2026 resume (removed from the repo; in git history) adds: Capital One Tech Summit runner-up, National Physics Olympiad finalist (top 40), and Craig Events generating 43+ real inquiries (live at craigevents.com).
- There are no testimonials yet. Never fabricate quotes, endorsements, metrics, or clients.

## Product Principles

1. **Proof over adjectives.** Every claim should point to something real: a shipped product, a named program, a number, a link.
2. **Recruiter-first, depth on demand.** Make the 10-second skim decisive, and let engineers and clients drill into the details.
3. **Craft is the argument.** The site itself should show the design-minded engineering it claims.
4. **A person, not a template.** Keep the creative, human side (chess, art) as part of the story, not decoration.
