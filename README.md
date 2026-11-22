# Splanchnology Typing

A quiet typing drill for Splanchnology 1 & 2: a structure slowly rotates, you type its name.

```
npm install
npm run fetch-model   # the published 3D model, or build it: see Models
npm run dev
```

`tab` reveals a letter · `enter` reveals the answer / moves on. Pick the syllabus questions to drill from the topic menu at the top.

Working on it together: see [CONTRIBUTING.md](CONTRIBUTING.md) (Korean).

## Note figures

`embed.html?v=<id>` shows one figure for the anatomy notes, to put in a note as an iframe:

```html
<iframe src="https://vousvoyezsue-ops.github.io/Anatomy-Atlas/embed.html?v=aortic-arch" loading="lazy"></iframe>
```

Each figure (which parts are highlighted, their colours and legend labels) is defined in `src/data/views.js`.

## Models

`public/anatomy.glb` holds every part in its place in the body, so each answer is shown among faint neighbouring organs. It is built from BodyParts3D:

- **4.0** (IS-A set) for almost everything, as packed by `github.com/tamir-ichikawa/human-atlas` (`dist/assets`)
- **4.3** for what 4.0 lacks, such as the vagus, phrenic and recurrent laryngeal nerves, from `github.com/olivercase/body_parts_3d_api`. Its meshes live in Git LFS; the build downloads only those it needs into `.cache/` and checks each against its LFS hash.
- **3.0** for what neither has (the lung lobes, a few abdominal wall muscles), from `github.com/Kevin-Mattheus-Moerman/BodyParts3D`; the build downloads just those STL files into `.cache/`

```
npm run sources   # 4.0 and 4.3 into .sources/, at pinned commits
npm run models    # → public/anatomy.glb
```

The model is not kept in git: GitHub Actions builds it for every pull request (as a check) and for each deploy. Behind a proxy, set `NODE_USE_ENV_PROXY=1` so the downloads use it. `npm run parts` lists every available part in `docs/parts.tsv`.

Parts are named by FMA id. `src/data/structures.js` sets which parts make up each quiz card and its syllabus questions; `src/data/sources.js` maps ids that 4.0 splits into several meshes.

3D models: BodyParts3D © DBCLS, CC BY-SA 2.1 JP — re-oriented, simplified, names modified.
The derived model `public/anatomy.glb` is shared under the same licence.
