// Figures for the anatomy notes, opened as embed.html?v=<id>.
// groups: highlighted parts, each with its own colour and legend label.
// soft:   parts drawn faintly behind them for orientation.
// turn:   starting rotation in degrees (0 = front, 90 = patient's left side).
// spin:   slow auto-rotation; off for figures meant to be read from the front.
// detail: triangle budget for very large parts (default set in the build).

// Lit colours, a step lighter than the notes' ink colours so they read in 3D.
export const COLOURS = {
  rose: '#c98a91',
  paleRose: '#e0b9bc',
  gold: '#cfae6e',
  sage: '#9aa978',
  sky: '#88a0c2',
  paleSky: '#b9c7db',
  slate: '#6f7f99',
  ivory: '#e8e1d3',
  cartilage: '#cdd6d3',
}

const RIBS = [
  'FMA7857', 'FMA7882', 'FMA7909', 'FMA7957', 'FMA8066', 'FMA8175', 'FMA8229', 'FMA8283', 'FMA8364', 'FMA8445', 'FMA8531', 'FMA8533',
  'FMA7987', 'FMA8012', 'FMA8039', 'FMA8148', 'FMA8093', 'FMA8202', 'FMA8256', 'FMA8310', 'FMA8391', 'FMA8472', 'FMA8532', 'FMA8534',
]
const FIRST_RIBS = ['FMA7857', 'FMA7987']
// BP24/BP28 hold the lower (false-rib) cartilages; 1–7 are separate parts.
const COSTAL_CARTILAGES = [
  'BP24', 'BP28',
  'FMA7875', 'FMA7886', 'FMA7913', 'FMA7976', 'FMA8070', 'FMA8194', 'FMA8248',
  'FMA8005', 'FMA8031', 'FMA8058', 'FMA8167', 'FMA8112', 'FMA8221', 'FMA8275',
]
const MANUBRIUM = ['FMA7486']
const STERNAL_BODY = ['FMA7487']
const XIPHOID = ['FMA7488']
const STERNUM = [...MANUBRIUM, ...STERNAL_BODY, ...XIPHOID]
const CLAVICLES = ['FMA13322', 'FMA13323']
const T1 = ['FMA9165']
const THORACIC_VERTEBRAE = [
  'FMA9165', 'FMA9187', 'FMA9209', 'FMA9248', 'FMA9922', 'FMA9945', 'FMA9968', 'FMA9991', 'FMA10014', 'FMA10037', 'FMA10059', 'FMA10081',
]
const CAGE = [...RIBS, ...COSTAL_CARTILAGES, ...STERNUM, ...THORACIC_VERTEBRAE]

const HEART = ['FMA7274']
const THYMUS = ['FMA71194', 'FMA71195']
const TRACHEA = ['FMA7394']
const ESOPHAGUS = ['FMA7131']

const SVC = ['FMA4720']
const RIGHT_BCV = ['FMA4751']
const LEFT_BCV = ['FMA4761']
const NECK_VEINS = ['FMA4754', 'FMA4762', 'FMA4755', 'FMA4763'] // internal jugular & subclavian vv.
const VEINS = [...SVC, ...RIGHT_BCV, ...LEFT_BCV]

const AORTA = ['FMA3736', 'FMA3768', 'FMA3784'] // ascending, arch, descending
const BRACHIOCEPHALIC_TRUNK = ['FMA3932nsn']
const RIGHT_BRANCHES = ['FMA3941', 'FMA3953'] // right common carotid & subclavian aa.
const LEFT_CCA = ['FMA4058']
const LEFT_SUBCLAVIAN = ['FMA4694']
const ARTERIES = [...AORTA, ...BRACHIOCEPHALIC_TRUNK, ...LEFT_CCA, ...LEFT_SUBCLAVIAN]

const TRANSVERSUS_THORACIS = ['FMA9761', 'FMA9762']
const EXTERNAL_INTERCOSTAL = ['FMA9756']
const INTERNAL_INTERCOSTAL = ['FMA9757']
const INNERMOST_INTERCOSTAL = ['FMA9758']

export const VIEWS = {
  'thoracic-cage': {
    title: 'Thoracic cage',
    turn: 20,
    spin: true,
    groups: [
      { label: 'Manubrium', ko: '흉골자루', colour: 'gold', parts: MANUBRIUM },
      { label: 'Body of sternum', ko: '흉골체', colour: 'paleRose', parts: STERNAL_BODY },
      { label: 'Xiphoid process', ko: '칼돌기', colour: 'rose', parts: XIPHOID },
      { label: 'Costal cartilages', ko: '늑연골', colour: 'paleSky', parts: COSTAL_CARTILAGES },
      { label: 'Ribs 1–12', ko: '늑골', colour: 'ivory', parts: RIBS },
      { label: 'Thoracic vertebrae', ko: '흉추', colour: 'sage', parts: THORACIC_VERTEBRAE },
    ],
    soft: CLAVICLES,
  },

  'superior-aperture': {
    title: 'Superior thoracic aperture',
    turn: 0,
    tilt: 35,
    spin: false,
    groups: [
      { label: 'T1 vertebra', ko: '제1흉추', colour: 'sage', parts: T1 },
      { label: 'First ribs', ko: '제1늑골', colour: 'gold', parts: FIRST_RIBS },
      { label: 'Manubrium', ko: '흉골자루', colour: 'rose', parts: MANUBRIUM },
    ],
    soft: [...CAGE, ...CLAVICLES],
    frame: [...T1, ...FIRST_RIBS, ...MANUBRIUM, ...CLAVICLES],
  },

  'intercostal-muscles': {
    title: 'Intercostal muscles',
    turn: 60,
    spin: true,
    groups: [
      { label: 'External intercostal', ko: '바깥늑간근', colour: 'rose', parts: EXTERNAL_INTERCOSTAL, detail: 14000 },
      { label: 'Internal intercostal', ko: '속늑간근', colour: 'gold', parts: INTERNAL_INTERCOSTAL, detail: 14000 },
      { label: 'Innermost intercostal', ko: '맨속늑간근', colour: 'sky', parts: INNERMOST_INTERCOSTAL, detail: 14000 },
    ],
    soft: CAGE,
  },

  'cardiac-part': {
    title: 'Behind the sternum',
    turn: 25,
    spin: true,
    groups: [
      { label: 'Heart', ko: '심장', colour: 'rose', parts: HEART },
      { label: 'Sternum', ko: '흉골', colour: 'gold', parts: STERNUM },
      { label: 'Transversus thoracis', ko: '가로흉근', colour: 'sage', parts: TRANSVERSUS_THORACIS },
    ],
    soft: [...RIBS, ...COSTAL_CARTILAGES],
    frame: [...HEART, ...STERNUM, ...TRANSVERSUS_THORACIS],
  },

  thymus: {
    title: 'Thymus over the great vessels',
    turn: 15,
    spin: true,
    groups: [{ label: 'Thymus', ko: '흉선', colour: 'gold', parts: THYMUS }],
    soft: [...VEINS, ...ARTERIES, ...HEART, ...TRACHEA, ...STERNUM],
    frame: [...THYMUS, ...VEINS, ...AORTA.slice(0, 2), ...HEART],
  },

  'brachiocephalic-veins': {
    title: 'Right vs left brachiocephalic vein',
    turn: 0,
    spin: false,
    groups: [
      { label: 'Right brachiocephalic v. — short, vertical', ko: '우완두정맥 — 짧고 수직', colour: 'sky', parts: RIGHT_BCV },
      { label: 'Left brachiocephalic v. — long, oblique', ko: '좌완두정맥 — 길고 비스듬', colour: 'slate', parts: LEFT_BCV },
      { label: 'Superior vena cava', ko: '상대정맥', colour: 'paleRose', parts: SVC },
      { label: 'Internal jugular & subclavian vv.', ko: '속목정맥 · 빗장밑정맥', colour: 'paleSky', parts: NECK_VEINS },
    ],
    soft: [...AORTA.slice(0, 2), ...BRACHIOCEPHALIC_TRUNK, ...LEFT_CCA, ...LEFT_SUBCLAVIAN, ...HEART],
    frame: [...VEINS, ...NECK_VEINS],
  },

  'aortic-arch': {
    title: 'Aortic arch and its branches',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Aorta — ascending, arch, descending', ko: '대동맥', colour: 'rose', parts: AORTA },
      { label: 'Brachiocephalic trunk', ko: '팔머리동맥', colour: 'gold', parts: BRACHIOCEPHALIC_TRUNK },
      { label: 'Left common carotid a.', ko: '왼온목동맥', colour: 'sage', parts: LEFT_CCA },
      { label: 'Left subclavian a.', ko: '왼빗장밑동맥', colour: 'sky', parts: LEFT_SUBCLAVIAN },
      { label: 'Right common carotid & subclavian aa.', ko: '오른온목 · 빗장밑동맥', colour: 'paleRose', parts: RIGHT_BRANCHES },
    ],
    soft: [...HEART, ...TRACHEA, ...ESOPHAGUS],
    frame: [...AORTA.slice(0, 2), ...BRACHIOCEPHALIC_TRUNK, ...LEFT_CCA, ...LEFT_SUBCLAVIAN, ...RIGHT_BRANCHES],
  },

  'four-layers': {
    title: 'Four layers of the supracardiac part',
    turn: 70,
    spin: true,
    groups: [
      { label: '1 · Thymus', ko: '흉선', colour: 'gold', parts: THYMUS },
      { label: '2 · Large veins', ko: '큰 정맥', colour: 'sky', parts: VEINS },
      { label: '3 · Large arteries', ko: '큰 동맥', colour: 'rose', parts: [...ARTERIES, ...RIGHT_BRANCHES] },
      { label: '4 · Trachea & esophagus', ko: '기관 · 식도', colour: 'sage', parts: [...TRACHEA, ...ESOPHAGUS] },
    ],
    soft: [...HEART, ...STERNUM],
    frame: [...THYMUS, ...VEINS, ...AORTA.slice(0, 2)],
  },
}

// Parts the figures need, with a triangle budget for each.
export const VIEW_PARTS = {}
for (const view of Object.values(VIEWS)) {
  for (const id of view.soft ?? []) VIEW_PARTS[id] ??= 0
  for (const g of view.groups) for (const id of g.parts) VIEW_PARTS[id] = Math.max(VIEW_PARTS[id] ?? 0, g.detail ?? 0)
}
