# GoKurious · Class 3

[Open the public learning site](https://rakesh3834.github.io/gokurious-class3/)

100 interactive lessons: 20 each in Science, Maths, English, Hindi and Computer. Choose a subject, search for a topic and open a lesson without an account.

The September 2026 redesign adds real WebGL 3D scenes, soft shadows, dimensional objects and responsive activity tools. The visual style is a stylized educational diorama; these are procedural browser models, not Blender renders or photorealistic assets. Drawing and selection exercises retain their working touch canvases within the studio.

## Playing and reading

- **Play:** read one short task and start with visible buttons, sliders or a direct tap/drag on the picture. No activity dropdowns are shown. Purple choices show what is selected.
- **Try ideas:** explore the original three prompts with the full set of controls. Tap **Next idea** to move through them.
- **Quiz:** answer the original three questions, read answer-specific feedback and retry.
- **Read:** open the original GoKurious article, challenges, FAQs and grown-up activities. Activity state is retained while reading.

The current picture, controls and short feedback share one phone/tablet screen. Field buttons switch between inputs; a small **More** button cycles additional actions in dense activities. **Why?** opens the complete explanation. **Help** explains the activity, offers the original audio controls and lets you turn the 3D view. Listening buttons remain in Play when hearing a word is part of the task.

Plant-building uses six visible part buttons. Story sequencing uses scene choices and Earlier/Later buttons. Keyboard activities show usable keys and the target text. Selected scenes also support direct taps or dragging, with visible button/slider alternatives. Text entry has a focused layout and a **Done typing** button. The article and help scroll normally. Reloading or resetting clears activity progress; the site does not save personal information or progress remotely.

## Hindi and audio

All 20 Hindi lessons are included. Hindi pronunciation review remains pending. The portal and lesson help retain that notice. Audio uses the existing browser speech facilities, whose voices vary by device. This redesign does not add or claim a newly verified narration track.

## Structure and content preservation

- `content/`: the 100 original lesson models and complete reading sections, with state hooks and the new studio entry point.
- `assets/studio.js`, `studio.css`: responsive controls, reading navigation, exploration prompts and quiz presentation.
- `assets/studio-guides.js`: short goals, playing instructions and opening-control choices for every lesson.
- `assets/studio-scene.js`: topic-aware Three.js scene renderer.
- `assets/vendor/`: self-hosted Three.js 0.180.0 and SVGLoader, with the MIT license. No runtime CDN is required.
- `assets/previews/`: captures of the lesson visuals from the initial 3D release; individual scenes may have since been refined.
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
