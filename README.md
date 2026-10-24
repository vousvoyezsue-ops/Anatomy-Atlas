# Splanchnology Typing

A quiet typing drill for Splanchnology 1 & 2: a structure slowly rotates, you type its name.

```
npm install
npm run dev
```

`tab` reveals a letter · `enter` reveals the answer / moves on. Pick the syllabus questions to drill from the topic menu at the top.

## Models

`public/anatomy.glb` holds every part in its place in the body, so each answer is shown among faint neighbouring organs. It is generated from [BodyParts3D](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/) v3.0 STL files
(mirror: `github.com/Kevin-Mattheus-Moerman/BodyParts3D`):

```
npm run models -- <path-to>/BodyParts3D/assets/BodyParts3D_data/stl
```

Which parts make up each card, and which syllabus questions it belongs to, is set in `src/data/structures.js`.

3D models: BodyParts3D © DBCLS, CC BY-SA 2.1 JP — re-oriented, simplified, names modified.
The derived model `public/anatomy.glb` is shared under the same licence.
