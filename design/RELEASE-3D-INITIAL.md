# 3D studio release · 12 September 2026

100 lessons, including all 20 Hindi lessons, retain their original topic IDs, learning outcomes and reading content. Existing shared addresses under `lessons/` redirect to the corresponding studio. The site remains organized into five subject galleries with topic search.

## Verification

| Check | Result |
| --- | --- |
| All 100 original article/FAQ/teacher-activity sections and quiz data compared with the prior public commit | Preserved exactly |
| All 100 lessons across 320×568, 360×640, 390×844, 768×1024, 1024×768 and 667×375 browser viewports | 5,304 layout states checked; no offscreen active controls or document overflow in the matrix |
| Explore/Missions tool groups and all three Check questions | Included in the layout matrix; active control targets at least 48 CSS pixels, with the whole label used for checkbox targets |
| Every lesson's live WebGL scene and sample interactions after renderer refinements | 100 rendered without JavaScript page errors |
| Correct and incorrect answers for all 300 original questions, followed by reset | Passed |
| English, Hindi and computer text entry with a reduced visible viewport and keyboard-only exit | Passed after waiting for the browser resize event to settle |
| Native drawing, correct/incorrect computer-part placement, base-ten exchange and jug-volume preservation | Passed |
| Normal animation, reduced motion and pausing while reading | Targeted checks passed |
| Topic search, five subject links, enlarged text in a dense Hindi activity and WebGL-disabled fallback | Targeted checks passed |
| Content hashes, all studio integrations and preview files, 100 legacy redirects, five subject indexes and local portal references | Build and integrity checks passed |

The machine-readable evidence is in [verification-3d-initial.json](verification-3d-initial.json). Layout checks used Chrome on macOS with headless software WebGL. The renderer was then checked again across all 100 lessons after the shared SVG bridge and selected scene refinements. Screenshots were reviewed for representative scenes and all subject galleries. The gallery uses captures of the actual WebGL visuals; drawing exercises use their actual working canvas.

## Scope and limits

The art direction uses procedural, stylized 3D objects with physical materials and soft lighting. It does not claim photorealism, Blender rendering or professionally commissioned art. Flat language/document surfaces remain flat where that supports reading and the teaching objective.

Controls are staged into tool groups so the current scene and current action fit on small screens. Missions reuse the topic's three experiment prompts and are self-directed. The full article and help can scroll. The original model fallback on devices without WebGL may also need scrolling. Some original drag instructions are fulfilled through equivalent tap controls; native drawing still supports dragging.

Physical Android, iPhone and iPad testing remains outstanding. Safari and Firefox were not separately tested. The enlarged-text and keyboard checks are targeted checks, not a complete accessibility certification. No new verified voice recording was added; all Hindi pronunciation-review notices remain in place.
