# GoKurious · Class 3

[Open the public learning site](https://rakesh3834.github.io/gokurious-class3/)

100 interactive lessons: 20 each in Science, Maths, English, Hindi and Computer. Choose a subject, search for a topic and open a lesson without an account.

The September 2026 redesign adds real WebGL 3D scenes, soft shadows, dimensional objects and responsive activity tools. The visual style is a stylized educational diorama; these are procedural browser models, not Blender renders or photorealistic assets. Drawing and selection exercises retain their working touch canvases within the studio.

## Playing and reading

- **Explore:** change a tool and inspect the result. The tool selector and arrows reveal further controls without leaving the active scene. The turn button changes the viewing angle.
- **Missions:** three topic-specific ideas to predict, experiment and explain. These are self-directed prompts, not automatically assessed mastery scores.
- **Check:** the original three questions, with answer-specific explanations and retry.
- **Read:** the original GoKurious article, challenges, FAQs and grown-up activities. Current activity state is retained while reading.

Phone and tablet layouts keep the current scene, active tools and feedback together. Longer explanations have a continue button. Text entry has a focused editing layout. The article scrolls normally. Reloading or restarting clears activity progress; the site does not save personal information or progress remotely.

## Hindi and audio

All 20 Hindi lessons are included. Hindi pronunciation review remains pending. The portal and lesson help retain that notice. Audio uses the existing browser speech facilities, whose voices vary by device. This redesign does not add or claim a newly verified narration track.

## Structure and content preservation

- `content/`: the 100 original lesson models and complete reading sections, with state hooks and the new studio entry point.
- `assets/studio.js`, `studio.css`: responsive tools, reading navigation, missions and quiz presentation.
- `assets/studio-scene.js`: topic-aware Three.js scene renderer.
- `assets/vendor/`: self-hosted Three.js 0.180.0 and SVGLoader, with the MIT license. No runtime CDN is required.
- `assets/previews/`: screenshots of the actual lesson visuals.
- `catalog.json`: subject and topic metadata, original and current content hashes.
- `subjects/`: five searchable subject indexes.
- `lessons/`: redirects preserving all previously shared lesson addresses.
- `design/`: research, all 100 topic specifications and release verification.

All article/FAQ/teacher-activity sections and original quiz data were compared against the previous public release and preserved exactly. The HTML files themselves have changed to integrate the studio and are no longer standalone exports: serve them with the shared assets. Source workbooks were not modified. Original curriculum links and credits remain in the lessons; source PDFs are not bundled.

## Build and serve

Requires Node.js 20 or later. No package installation is needed.

```sh
npm run build
npm run check
npm start
```

Open the address printed by the server. The upgrade script is idempotent. The build refreshes hashes and regenerates the portal; the check verifies counts, hashes, local links, studio integrations, previews, redirects and Hindi draft notices.

GitHub Pages publishes the root of `main`. See [the research record](design/RESEARCH.md) and [release verification](design/RELEASE.md) for evidence and testing limits. Browser viewport checks do not substitute for hands-on testing on physical Android, iPhone and iPad devices. Devices without WebGL use the original model fallback, which may require scrolling.
