# Splanchnology Typing

A quiet typing drill for Splanchnology 1 & 2: a structure slowly rotates, you type its name.

```
npm install
npm run dev
```

`tab` reveals a letter · `enter` reveals the answer / moves on. Pick the syllabus questions to drill from the topic menu at the top.

## Note figures

`embed.html?v=<id>` shows one figure for the anatomy notes, to put in a note as an iframe:

```html
<iframe src="https://vousvoyezsue-ops.github.io/Anatomy-Atlas/embed.html?v=aortic-arch" loading="lazy"></iframe>
```

Each figure (which parts are highlighted, their colours and legend labels) is defined in `src/data/views.js`.

## Models

`public/anatomy.glb` holds every part in its place in the body, so each answer is shown among faint neighbouring organs. It is built from BodyParts3D:

- **4.0** (IS-A set) for almost everything, as packed by `github.com/tamir-ichikawa/human-atlas` (`dist/assets`)
- **3.0** for what 4.0 lacks (the lung lobes, a few abdominal wall muscles, the lower costal cartilages), from `github.com/Kevin-Mattheus-Moerman/BodyParts3D`

```
npm run models -- <human-atlas>/dist/assets <BodyParts3D>/assets/BodyParts3D_data/stl
```

Parts are named by FMA id. `src/data/structures.js` sets which parts make up each quiz card and its syllabus questions; `src/data/sources.js` maps ids that 4.0 splits into several meshes.

3D models: BodyParts3D © DBCLS, CC BY-SA 2.1 JP — re-oriented, simplified, names modified.
The derived model `public/anatomy.glb` is shared under the same licence.
