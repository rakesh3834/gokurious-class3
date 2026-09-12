# Design research · 12 September 2026

This redesign uses independent visuals and code. The references below inform interaction structure and presentation; their artwork, recordings and lesson text were not copied.

## Access and observations

| Official reference | Public evidence available | Applied to these lessons |
| --- | --- | --- |
| [GoKurious](https://gokurious.com/) and [Fractions](https://gokurious.com/simulators/fractions/) | Public learning sequence and article sections inspected. Interactive play requires sign-in, so no signed-in play session is claimed. | Keep the explanation, experiment prompts, questions, FAQs and grown-up activities together; separate the immersive scene from the reading view. Preserve the existing reading presentation. |
| [Math Learning Center Number Pieces](https://www.mathlearningcenter.org/apps/number-pieces) | Official app description of base-ten pieces, joining and splitting. | Make value-preserving exchanges visible with hundreds, tens and ones. Keep labels and totals. |
| [Math Learning Center Fractions](https://www.mathlearningcenter.org/apps/fractions) | Official description of fraction models and overlays. | Keep one whole explicit; compare equal pieces and overlays without introducing later-grade operations. |
| [Toy Theater Cube](https://toytheater.com/cube/) and [Tally](https://toytheater.com/tally/) | Public tool descriptions and interfaces show reversible object changes and tally controls. | Give immediate visual responses, clear selected tools, reversible experiments and a reset. Avoid timed competition for these concept lessons. |
| [Tinybop Plants](https://tinybop.com/apps/plants) | Public product page shows explorable natural scenes, labels and underground views. | Create plant and soil dioramas; reveal roots and connect visible plant parts to their jobs. No downloaded app play is claimed. |
| [Tinybop Weather](https://tinybop.com/apps/weather), [States of Matter](https://tinybop.com/apps/states-of-matter), [Light & Color](https://tinybop.com/apps/light-and-color) | Official product descriptions of changing inputs and observing physical phenomena. | Compare rain on two surfaces, container changes and clear/blurred/hidden views. Exclude advanced particles, temperature measurement and severe-weather content outside the selected topics. |
| [Duolingo ABC](https://abc.duolingo.com/how-we-teach) | Official account of short phonics, word-building and comprehension activities. | Provide short construction/retry loops and story prompts. This is an interaction reference, not a Hindi orthography authority. |
| [Starfall](https://www.starfall.com/h/ltr-classic/) | Public index of letters, word-family practice and reading activities; some activities require JavaScript. | Keep the target sound or word visible and let the learner repeat a small step. No claim that every linked activity was played. |
| [TypingClub](https://www.typingclub.com/) | Official description of keyboard practice, interactive activities and story typing. | Keep typed output, cursor and keyboard state visible; preserve editing tools and meaningful practice goals. |
| [Code.org CS Fundamentals](https://code.org/mr/curriculum/computer-science-fundamentals) and [teaching guidance](https://support.code.org/hc/en-us/articles/26001058366093-Teaching-Computer-Science-Fundamentals-Courses-A-F) | Official descriptions of elementary computing, creative tasks and scaffolding. | Use guided tasks, immediate response and a safe practice workstation. These controls simulate a computer; they do not alter the learner's device. |
| [ABCya](https://www.abcya.com/) | Public activity catalogue includes keyboard, technology and creative tools. The specific keyboard activity was embedded and not substantively inspectable. | Use as catalogue-level evidence only. Do not infer the embedded game's scoring or behavior. |

## Decisions and topic records

[lesson-specs.json](lesson-specs.json) covers all 100 IDs with their original topic, learning outcome, teaching boundary, reference links, adaptation decisions and replay/control notes. Where it reuses earlier research completed on the same day, that provenance is recorded. Those records are not a claim of 200 separate fresh competitor play sessions.

The studio uses three phases: exploration, self-directed missions and the existing assessed questions. A staged tool shelf makes dense activities usable on small screens without shrinking the touch targets. Three-dimensional depth is used for objects and scenes; written language, labels, documents and two-dimensional shapes retain legible flat surfaces when that is what the topic teaches.

The implementation uses self-hosted [Three.js](https://threejs.org/docs/) 0.180.0. Object geometry, material response and lighting run in WebGL. Motion follows lesson state, responds to reduced-motion preferences and pauses while reading or when the tab is hidden. The aesthetic is stylized, not photographic, and no Blender production workflow is claimed.
