# Clearer interactions · version 2.1 · 12 September 2026

All 100 lessons, including Hindi, now open with a short goal, a concrete playing instruction and visible choices. Buttons, sliders and direct scene interactions replace the old activity dropdowns. Repeated headings and the separate action-paging row were removed on short phones, giving the picture more room. Drawing artwork is shown closer where desktop decoration did not help the task.

Plant building, story sequencing, keyboard practice, the computer routine, note saving and copy/paste have specific controls or guided steps. Additional model controls remain available in Try ideas. The original three questions, articles, FAQs and teacher activities are preserved. Full explanations open with Why; Help includes audio controls and availability status.

## Verification

| Check | Result |
| --- | --- |
| All 100 lessons, Play / first Try idea / first Quiz, six browser viewports | 1,800 layout observations passed |
| All three experiment prompts per lesson on 320×568 | 300 prompts fit |
| All 300 questions: correct and incorrect answer feedback | Passed; correct-answer layouts also checked |
| Quiz reset in all 100 lessons | Passed |
| Final code: every lesson opening on 320×568 | 100 WebGL scenes rendered; no page errors, overflow, offscreen controls or visible dropdowns |
| Visible control dimensions | At least 48 CSS pixels, allowing subpixel measurement tolerance |
| Window swiping, snack-cut dragging, slider/keyboard change and reset | Passed |
| Story ordering, typing targets, eight-step computer routine | Passed |
| Direct drawing, picture filling and colour sampling | Passed |
| Named note save/reopen and copy/paste between cards | Passed |
| Text entry with a reduced 320×320 visible viewport | Field and Done typing fit; scene temporarily gives way to typing |
| Read, article/FAQ visibility and return to Play | Passed in all five subjects |
| Lesson HTML and catalogue compared with prior release | All 100 lesson files and catalogue remain byte-for-byte identical |
| Build, hashes, guides, redirects and local references | Passed |

The six viewports were 320×568, 360×640, 390×844, 768×1024, 1024×768 and 667×375. Checks used Chrome on macOS through CUA. The main matrix was followed by deeper small-phone checks, a final opening check of all 100 lessons and targeted interaction checks after refinements. These are browser viewport tests, not physical-device or child-usability studies. Full machine-readable evidence and tested interaction details are in [verification.json](verification.json).

## Scope and limits

The art uses stylized procedural 3D, with readable flat surfaces for language and documents. No Blender rendering or photorealistic art claim is made. Some direct interactions apply to selected scenes; visible buttons and sliders provide the corresponding alternative. A compact More button cycles additional actions in dense activities. Reading, Help and the original no-WebGL fallback may scroll.

Physical Android, iPhone and iPad checks remain outstanding. No new Safari/Firefox, reduced-motion emulation or full accessibility certification was performed in this revision; the existing reduced-motion and pause behavior remains in the renderer. No new narration was added or certified, and Hindi pronunciation review remains pending. Gallery previews retain captures from the initial 3D release, so some scenes now look more refined when opened.

The earlier release evidence is retained in [RELEASE-3D-INITIAL.md](RELEASE-3D-INITIAL.md) and [verification-3d-initial.json](verification-3d-initial.json). Research includes the directly operated [GoKurious Rainbow Light simulator](https://gokurious.com/simulators/rainbow-light/) and the official competitor descriptions documented in [RESEARCH.md](RESEARCH.md).
