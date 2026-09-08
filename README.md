# GoKurious · Class 3

100 interactive lessons across Science, Maths, English, Hindi and Computer, with 20 lessons per subject.

**Public website:** https://rakesh3834.github.io/gokurious-class3/

Choose a subject, open an activity, explore its controls, read the explanation and try the challenges. Each lesson has a shareable page, previous/next navigation and a link back to its subject. No account is required.

## Hindi audio status

All 20 Hindi lessons are included. They remain drafts pending Hindi pronunciation review. The portal displays this status on the Hindi subject page and each Hindi lesson. Spoken audio uses the browser's available voices, so availability and pronunciation can vary by device. This release does not promote the Hindi drafts to fully reviewed status.

## Source and structure

- `content/`: the 100 complete, original, self-contained lesson HTML files, preserved byte for byte from the saved workbook exports.
- `catalog.json`: subject order, titles, topics, duration, QA status and original lesson SHA-256 hashes.
- `subjects/`: the five subject indexes.
- `lessons/`: a navigation frame for each original interactive lesson.
- `assets/portal.css`: responsive portal styling.
- `scripts/`: dependency-free portal build, integrity checks and a local preview server.

Curriculum source links and original illustration credits remain inside each lesson. External reference documents retain their own rights; this repository does not bundle the source PDFs.

## Build and check

Requires Node.js 20 or newer. No dependency installation is needed.

```sh
npm run build
npm run check
npm start
```

The build regenerates navigation pages while verifying that the original lesson contents match their stored hashes. The check verifies lesson counts, hashes, local links, previous/next navigation and Hindi review labels.

GitHub Pages publishes the root of `main`. `.nojekyll` keeps the static files unchanged. To update the portal, rebuild and check before pushing to `main`.
