# Arabic Light Academy — Games Studio

An Arabic-first, responsive foundation for a future educational games platform. This repository is the source of truth for the project formerly planned under the working repository name `injazio`.

## Phase 1 — Complete

- Arabic Light Academy visual identity (warm ivory, deep teal, turquoise, soft gold)
- RTL dashboard and responsive navigation
- Working Arabic/English interface switch
- Real zero-data states instead of fabricated teacher statistics
- Nine game patterns presented as a discoverable, searchable catalogue
- Teacher workspace sections prepared for future development
- Accessibility basics: semantic navigation, keyboard-accessible controls, focus styles and dialog handling

## Run locally

No dependencies or build step are required. Serve the `dist` folder with any static HTTP server:

```bash
python3 -m http.server 8080 --directory dist
```

Open `http://localhost:8080`.

## Planned milestones

1. **Foundation / dashboard** — this release.
2. **Game editor** — questions, text/image/audio, scoring, feedback, bulk import and drafts.
3. **Nine game mechanics** — quizzes, matching, ordering, sorting, drag-and-drop, memory, word hunt, word clues and composite games.
4. **Five presentation modes** — direct, wheel, train, airplane and levels.
5. **Library and sharing** — reusable templates and published games.
6. **Accounts** — teachers, students, groups, secure persistence and permissions.
7. **Reporting and live challenges** — attempts, analytics and real-time sessions.
8. **Release and deployment** — testing, performance, security and hosting.

## Important scope note

This is an interactive front-end foundation, **not yet a production back-end**. Counts correctly start at zero. Creation, saving, publishing, sign-in and student management are not pretended to work before their corresponding milestones are implemented.

## Brand assets

The current mark is a simple custom placeholder built from the approved brand colors. Replace `dist/favicon.svg` and the matching dashboard emblem with the official Arabic Light Academy logo when its source file is supplied.

## License

No license has been selected yet. The repository owner retains all rights until a license is added.
