# My Multilingual Classroom

A polished, privacy-minded teacher tool that turns a multilingual learner’s WIDA domain profile and a specific classroom task into a small, practical scaffold plan—without lowering the cognitive goal.

## Product philosophy

**Understand the learner. Scaffold the learning.** The app uses asset-based language, treats scores as one source of information, favors the smallest useful set of supports, and reminds teachers to fade scaffolds as independence grows.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Use **Load Demo Learner** to try the full workflow.

## Architecture

- `app/`: Next.js App Router entry points and responsive visual system
- `components/App.tsx`: accessible workflow and reusable presentation components
- `data/wida.ts`: domain, proficiency-band, subject, and task-demand data
- `data/strategies.ts`: initial scaffold library
- `lib/recommendations.ts`: deterministic analysis, prioritization, snapshot, and prompt logic
- `tests/`: recommendation and prompt tests

No AI API, database, authentication, analytics, or student-name field is used. State exists only in React memory and is not transmitted or persisted.

## Quality checks

```bash
npm run test
npm run typecheck
npm run build
```

## Deployment

Every push to `main` runs the GitHub Pages workflow and publishes the static export to:

`https://lenguajelabs-design.github.io/my-multilingual-classroom/`

The same codebase can also be hosted on Vercel, Netlify, Render, or Replit.

## Future ideas

Optional teacher accounts, local/exportable saved plans, school-approved AI integrations, richer task-language mappings, and educator-reviewed scaffold packs can be added behind the current data and logic boundaries.
