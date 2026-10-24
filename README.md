# Arabic Light Academy — Games Studio

An Arabic-first, responsive foundation for a future educational games platform. This repository is the source of truth for the project formerly planned under the working repository name `injazio`.

## Completed milestones

### Phase 1 — Foundation

- Arabic Light Academy visual identity (warm ivory, deep teal, turquoise, soft gold)
- RTL dashboard and responsive navigation
- Working Arabic/English interface switch
- Real zero-data states instead of fabricated teacher statistics
- Nine game patterns presented as a discoverable, searchable catalogue
- Teacher workspace sections prepared for future development
- Accessibility basics: semantic navigation, keyboard-accessible controls, focus styles and dialog handling

### Phase 2 — Game creator (browser-local)

- Game title, unit, level and description
- Question authoring: multiple choice, true/false and short answers
- Correct answer, points, timer, feedback, optional HTTPS image/audio links
- Add, select, duplicate, reorder and delete questions (up to 100)
- Bulk question entry from pipe-separated text
- Save and reopen drafts in browser `localStorage`; draft library search and deletion confirmation
- Export complete draft to JSON and **restore** an exported JSON file
- Interactive teacher preview: countdown, answer checking, next question and total score
- Dashboard shows the number and recent list of actual local drafts

## Run locally

No dependencies or build step are required. Serve the `dist` folder with any static HTTP server:

```bash
python3 -m http.server 8080 --directory dist
```

Open `http://localhost:8080`.

## Planned milestones

1. **Foundation / dashboard** — this release.
2. **Game editor** — implemented locally in this release.
3. **Nine game mechanics** — quizzes, matching, ordering, sorting, drag-and-drop, memory, word hunt, word clues and composite games.
4. **Five presentation modes** — direct, wheel, train, airplane and levels.
5. **Library and sharing** — reusable templates and published games.
6. **Accounts** — teachers, students, groups, secure persistence and permissions.
7. **Reporting and live challenges** — attempts, analytics and real-time sessions.
8. **Release and deployment** — testing, performance, security and hosting.

## Important scope note

This is a front-end learning-game editor, **not yet a production back-end**. Drafts are stored only in the browser where they were created, not in GitHub or the cloud. Export JSON regularly: clearing the browser's site data will delete its local drafts. Opening the same repository from another device does not sync data.

Creating, editing and saving **local drafts**, importing structured questions, and previewing quiz questions now work. Direct image/audio **links** are supported; actual media uploads require future backend storage. Publishing playable links, sign-in, classes, learner progress, and real reports are **not implemented**. The quiz-like preview is for teachers; nine fully developed game mechanics are planned for phase three.

## Use the editor

1. Open **Game Creator / إنشاء الألعاب** and enter a title.
2. Add questions, choose the answer type and set points/time. Choose a correct radio option for multiple choice or true/false.
3. Click **Save Draft / حفظ المسودة** to store it in the local library.
4. Use **Preview Game / معاينة اللعبة** to answer questions and verify feedback and scoring.
5. Use **Export JSON** to back up the game. Under **Bulk add questions**, use **Restore JSON** to bring that backup into another browser.

Bulk question text uses one question per line, with pipe separators:

```text
What is the first Arabic letter? | Alif | Baa | Taa | Thaa
How many letters are in باب? | 3 | 2 | 4 | 5
```

## Brand assets

The current mark is a simple custom placeholder built from the approved brand colors. Replace `dist/favicon.svg` and the matching dashboard emblem with the official Arabic Light Academy logo when its source file is supplied.

## License

No license has been selected yet. The repository owner retains all rights until a license is added.
