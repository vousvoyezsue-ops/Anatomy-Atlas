// Figures for the anatomy notes, opened as embed.html?v=<id>.
// groups: highlighted parts, each with its own colour and legend label.
// soft:   parts drawn faintly behind them for orientation.
// turn:   starting rotation in degrees (0 = front, 90 = patient's left side).
// spin:   slow auto-rotation; off for figures meant to be read from one side.
// zoom:   below 1 to leave more room around the framed parts.
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
  // Deeper tones for thin structures such as nerves, which vanish in pale ones.
  deepGold: '#b08528',
  deepSage: '#62803c',
  deepSky: '#4f6f99',
  deepRose: '#a8545e',
}

const RIBS = [
  'FMA7857', 'FMA7882', 'FMA7909', 'FMA7957', 'FMA8066', 'FMA8175', 'FMA8229', 'FMA8283', 'FMA8364', 'FMA8445', 'FMA8531', 'FMA8533',
  'FMA7987', 'FMA8012', 'FMA8039', 'FMA8148', 'FMA8093', 'FMA8202', 'FMA8256', 'FMA8310', 'FMA8391', 'FMA8472', 'FMA8532', 'FMA8534',
]
const FIRST_RIBS = ['FMA7857', 'FMA7987']
const COSTAL_CARTILAGES = [
  'FMA7875', 'FMA7886', 'FMA7913', 'FMA7976', 'FMA8070', 'FMA8194', 'FMA8248', 'FMA8302', 'FMA8383', 'FMA8464', // right 1–10
  'FMA8005', 'FMA8031', 'FMA8058', 'FMA8167', 'FMA8112', 'FMA8221', 'FMA8275', 'FMA8329', 'FMA8410', 'FMA8491', // left 1–10
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

// Topic 19 — posterior mediastinum
const DESCENDING_THORACIC_AORTA = ['FMA87217']
const ABDOMINAL_AORTA = ['FMA3789']
const AZYGOS = ['FMA4838']
const HEMIAZYGOS = ['FMA4944']
const ACCESSORY_HEMIAZYGOS = ['FMA5011']
const SUPERIOR_INTERCOSTAL_VEINS = ['FMA4877', 'FMA4797']
const SUBCOSTAL_VEINS = ['FMA4844', 'FMA4951']
const ASCENDING_LUMBAR_VEINS = ['FMA4843', 'FMA4950']
const IVC = ['FMA10951']
const POSTERIOR_INTERCOSTAL_ARTERIES = ['FMA63822']
const BRONCHIAL_ARTERY = ['FMA68109']
const OESOPHAGEAL_BRANCHES = ['FMA4149', 'FMA71537']
const MAIN_BRONCHI = ['FMA7396', 'FMA68418']
const LEFT_MAIN_BRONCHUS = ['FMA7396']
const CRICOID = ['FMA9615']
const THYROID_CARTILAGE = ['FMA55099']
const LEFT_ATRIUM = ['FMA9531']
const DIAPHRAGM = ['FMA13295']
const INFERIOR_CONSTRICTOR = ['FMA46635', 'FMA46636']
const MIDDLE_CONSTRICTOR = ['FMA46633', 'FMA46634']
const HYOID = ['FMA52749']
const LEFT_VAGUS = ['FMA18157']
const RIGHT_VAGUS = ['FMA18151']
const LEFT_PHRENIC = ['FMA65387', 'FMA6201'] // trunk and its pericardial branch
const RECURRENT_LARYNGEAL = ['FMA80694', 'FMA80695']
const INTERNAL_THORACIC_ARTERIES = ['FMA3969', 'FMA4068']
const INTERNAL_THORACIC_VEIN = ['FMA4758'] // right only in the model
const MUSCULOPHRENIC_ARTERIES = ['FMA10692', 'FMA4077']
const SUPERIOR_EPIGASTRIC_ARTERIES = ['FMA3988', 'FMA4083']
const SUBCLAVIAN_ARTERIES = ['FMA3953', 'FMA4694']
const SUPERIOR_INTERCOSTAL_ARTERIES = ['FMA5042', 'FMA4088']
const ANTERIOR_INTERCOSTAL_VEINS = ['FMA70839']
const INTERCOSTAL_NERVES = ['FMA85332', 'FMA85334', 'FMA8922', 'FMA6115', 'FMA6752'] // left 1st & 2nd with their branches
const LEFT_HILUM = ['FMA50873', 'FMA49913', 'FMA49916', 'FMA7396'] // left pulmonary a., pulmonary vv., main bronchus
const LUMBAR_VERTEBRAE = ['FMA13072', 'FMA13073', 'FMA13074', 'FMA13075', 'FMA13076']

// Topics 13–17 — the heart
const RA_WALL = ['FMA9457']
const LA_WALL = ['FMA9531']
const VENTRICLE_WALL = ['FMA13884']
const HEART_WALLS = [...RA_WALL, ...LA_WALL, ...VENTRICLE_WALL]
const RA_CAVITY = ['FMA11359']
const RV_CAVITY = ['FMA9291']
const LA_CAVITY = ['FMA9465']
const LV_CAVITY = ['FMA9466']
const TRICUSPID = ['FMA7238', 'FMA7239', 'FMA7240']
const MITRAL = ['FMA7242', 'FMA7243']
const PULMONARY_VALVE = ['FMA7247', 'FMA7249', 'FMA7250']
const AORTIC_VALVE = ['FMA7252', 'FMA7253', 'FMA7254']
const RV_PAPILLARY = ['FMA7260', 'FMA7261', 'FMA7262'] // anterior, posterior, septal
const LV_PAPILLARY = ['FMA7265', 'FMA7264'] // anterior (anterolateral), posterior
const PULMONARY_TRUNK = ['FMA8612', 'FMA50872', 'FMA50873'] // trunk, right and left pulmonary aa.
const PULMONARY_VEINS = ['FMA49911', 'FMA49913', 'FMA49914', 'FMA49916']
const LCA = ['FMA3855', 'FMA74912', 'FMA3860', 'FMA3868', 'FMA3872', 'FMA3874', 'FMA3876', 'FMA3892', 'FMA3895']
const RCA = ['FMA3802', 'FMA3807', 'FMA3815', 'FMA3818', 'FMA3837', 'FMA3840', 'FMA3847', 'FMA3848']
const GREAT_CARDIAC_VEIN = ['FMA4707', 'FMA66403'] // with the anterior interventricular vein
const SMALL_MIDDLE_CARDIAC_VEINS = ['FMA4713', 'FMA4714', 'FMA4716', 'FMA4712']
const ANTERIOR_CARDIAC_VEIN = ['FMA76767']
const CORONARY_SINUS = ['FMA4706']
const without = (list, ...remove) => list.filter((id) => !remove.flat().includes(id))

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

  'posterior-mediastinum': {
    title: 'Behind the heart',
    turn: 150,
    spin: true,
    groups: [
      { label: 'D · Descending thoracic aorta', ko: '하행흉대동맥', colour: 'rose', parts: DESCENDING_THORACIC_AORTA },
      { label: 'A · Azygos & hemiazygos vv.', ko: '홀정맥 · 반홀정맥', colour: 'sky', parts: [...AZYGOS, ...HEMIAZYGOS, ...ACCESSORY_HEMIAZYGOS] },
      { label: 'E · Oesophagus', ko: '식도', colour: 'sage', parts: ESOPHAGUS },
      { label: '+ Vagus nn. (not in DATES)', ko: '미주신경', colour: 'deepGold', parts: [...LEFT_VAGUS, ...RIGHT_VAGUS] },
    ],
    soft: [...HEART, ...TRACHEA, ...MAIN_BRONCHI, ...THORACIC_VERTEBRAE, ...AORTA.slice(0, 2)],
    frame: [...DESCENDING_THORACIC_AORTA, ...AZYGOS, ...HEMIAZYGOS, ...ESOPHAGUS, ...HEART],
  },

  'thoracic-aorta': {
    title: 'Thoracic aorta and its branches',
    turn: 140,
    zoom: 0.8,
    spin: true,
    groups: [
      { label: 'Ascending aorta & arch', ko: '상행대동맥 · 대동맥궁', colour: 'paleRose', parts: AORTA.slice(0, 2) },
      { label: 'Descending thoracic aorta', ko: '하행흉대동맥', colour: 'rose', parts: DESCENDING_THORACIC_AORTA },
      { label: 'Posterior intercostal aa.', ko: '뒤늑간동맥', colour: 'gold', parts: POSTERIOR_INTERCOSTAL_ARTERIES },
      { label: 'Bronchial a.', ko: '기관지동맥', colour: 'sky', parts: BRONCHIAL_ARTERY },
      { label: 'Oesophageal branches', ko: '식도가지', colour: 'sage', parts: OESOPHAGEAL_BRANCHES },
      { label: 'Abdominal aorta (below T12)', ko: '복대동맥', colour: 'slate', parts: ABDOMINAL_AORTA },
    ],
    soft: [...DIAPHRAGM, ...THORACIC_VERTEBRAE, ...ESOPHAGUS],
    frame: [...AORTA.slice(0, 2), ...DESCENDING_THORACIC_AORTA, ...ABDOMINAL_AORTA.slice(0, 1)],
  },

  'azygos-system': {
    title: 'The azygos system',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Azygos v.', ko: '홀정맥', colour: 'sky', parts: AZYGOS },
      { label: 'Hemiazygos v.', ko: '반홀정맥', colour: 'slate', parts: HEMIAZYGOS },
      { label: 'Accessory hemiazygos v.', ko: '덧반홀정맥', colour: 'paleSky', parts: ACCESSORY_HEMIAZYGOS },
      { label: 'Superior intercostal vv.', ko: '위늑간정맥', colour: 'gold', parts: SUPERIOR_INTERCOSTAL_VEINS },
      { label: 'Subcostal vv.', ko: '갈비밑정맥', colour: 'sage', parts: SUBCOSTAL_VEINS },
      { label: 'Ascending lumbar vv.', ko: '오름허리정맥', colour: 'rose', parts: ASCENDING_LUMBAR_VEINS },
      { label: 'Superior vena cava', ko: '상대정맥', colour: 'paleRose', parts: SVC },
    ],
    soft: [...THORACIC_VERTEBRAE, ...LUMBAR_VERTEBRAE, ...IVC, ...HEART],
    frame: [...AZYGOS, ...HEMIAZYGOS, ...ACCESSORY_HEMIAZYGOS, ...ASCENDING_LUMBAR_VEINS, ...SVC],
  },

  'oesophageal-constrictions': {
    title: 'Four constrictions of the oesophagus',
    turn: 50,
    zoom: 0.8,
    spin: true,
    groups: [
      { label: 'Oesophagus', ko: '식도', colour: 'sage', parts: ESOPHAGUS },
      { label: '① Cricoid cartilage — 15 cm', ko: '윤상연골', colour: 'sky', parts: CRICOID },
      { label: '② Aortic arch — 22.5 cm', ko: '대동맥궁', colour: 'rose', parts: AORTA.slice(1, 2) },
      { label: '③ Left main bronchus — 27.5 cm', ko: '왼주기관지', colour: 'gold', parts: LEFT_MAIN_BRONCHUS },
      { label: '④ Diaphragm — 40 cm', ko: '횡격막', colour: 'paleRose', parts: DIAPHRAGM },
    ],
    soft: [...TRACHEA, ...THYROID_CARTILAGE, ...AORTA.slice(0, 1), ...DESCENDING_THORACIC_AORTA, ...HEART],
    frame: [...ESOPHAGUS, ...CRICOID],
  },

  'oesophagus-left-atrium': {
    title: 'Oesophagus behind the left atrium',
    turn: 90,
    spin: false,
    groups: [
      { label: 'Oesophagus', ko: '식도', colour: 'sage', parts: ESOPHAGUS },
      { label: 'Left atrium', ko: '좌심방', colour: 'rose', parts: LEFT_ATRIUM },
      { label: 'Descending thoracic aorta', ko: '하행흉대동맥', colour: 'paleRose', parts: DESCENDING_THORACIC_AORTA },
    ],
    soft: [...HEART, ...THORACIC_VERTEBRAE, ...TRACHEA, ...MAIN_BRONCHI],
    frame: [...LEFT_ATRIUM, ...ESOPHAGUS.slice(0, 1), ...HEART],
  },

  'pharyngo-oesophageal': {
    title: 'Pharyngo-oesophageal junction, from behind',
    turn: 180,
    zoom: 0.75,
    spin: false,
    groups: [
      { label: 'Inferior pharyngeal constrictor', ko: '하인두수축근', colour: 'rose', parts: INFERIOR_CONSTRICTOR },
      { label: 'Middle pharyngeal constrictor', ko: '중인두수축근', colour: 'paleRose', parts: MIDDLE_CONSTRICTOR },
      { label: 'Oesophagus', ko: '식도', colour: 'sage', parts: ESOPHAGUS },
    ],
    soft: [...THYROID_CARTILAGE, ...CRICOID, ...TRACHEA, ...HYOID],
    frame: [...INFERIOR_CONSTRICTOR, ...MIDDLE_CONSTRICTOR, ...CRICOID],
  },

  'vagus-phrenic': {
    title: 'Vagus vs phrenic, from the left',
    turn: 90,
    spin: false,
    groups: [
      { label: 'Left phrenic n. — in front of the hilum', ko: '왼횡격신경 — 폐문 앞', colour: 'deepSage', parts: LEFT_PHRENIC },
      { label: 'Left vagus n. — behind the hilum', ko: '왼미주신경 — 폐문 뒤', colour: 'deepGold', parts: LEFT_VAGUS },
      { label: 'Left recurrent laryngeal n.', ko: '왼되돌이후두신경', colour: 'deepSky', parts: ['FMA80695'] },
      { label: 'Left lung root', ko: '왼폐뿌리', colour: 'paleRose', parts: LEFT_HILUM },
    ],
    soft: [...HEART, ...AORTA, ...DIAPHRAGM, ...THORACIC_VERTEBRAE, ...TRACHEA],
    frame: [...LEFT_HILUM, ...HEART],
    zoom: 0.85,
  },

  'vagus-nerves': {
    title: 'Both vagus nerves and their recurrent branches',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Left vagus n.', ko: '왼미주신경', colour: 'deepGold', parts: LEFT_VAGUS },
      { label: 'Right vagus n.', ko: '오른미주신경', colour: 'deepRose', parts: RIGHT_VAGUS },
      { label: 'Recurrent laryngeal nn.', ko: '되돌이후두신경', colour: 'deepSky', parts: RECURRENT_LARYNGEAL },
      { label: 'Oesophagus', ko: '식도', colour: 'sage', parts: ESOPHAGUS },
    ],
    soft: [...AORTA, ...BRACHIOCEPHALIC_TRUNK, ...RIGHT_BRANCHES, ...LEFT_CCA, ...LEFT_SUBCLAVIAN, ...TRACHEA, ...HEART],
    frame: [...LEFT_VAGUS, ...RIGHT_VAGUS, ...ESOPHAGUS],
    zoom: 1.15,
  },

  'internal-thoracic': {
    title: 'Internal thoracic artery and its branches',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Internal thoracic a.', ko: '속가슴동맥', colour: 'deepRose', parts: INTERNAL_THORACIC_ARTERIES },
      { label: 'Musculophrenic a.', ko: '근육가로막동맥', colour: 'gold', parts: MUSCULOPHRENIC_ARTERIES },
      { label: 'Superior epigastric a.', ko: '위배벽동맥', colour: 'sage', parts: SUPERIOR_EPIGASTRIC_ARTERIES },
      { label: 'Subclavian a. (origin)', ko: '빗장밑동맥', colour: 'paleRose', parts: SUBCLAVIAN_ARTERIES },
      { label: 'Internal thoracic v.', ko: '속가슴정맥', colour: 'sky', parts: INTERNAL_THORACIC_VEIN },
    ],
    soft: [...STERNUM, ...COSTAL_CARTILAGES, ...HEART, ...DIAPHRAGM],
    frame: [...INTERNAL_THORACIC_ARTERIES, ...MUSCULOPHRENIC_ARTERIES, ...SUBCLAVIAN_ARTERIES],
  },

  'intercostal-vessels': {
    title: 'Vessels and nerves of the intercostal spaces',
    turn: 40,
    spin: true,
    groups: [
      { label: 'Posterior intercostal aa. ← aorta', ko: '뒤늑간동맥', colour: 'deepRose', parts: POSTERIOR_INTERCOSTAL_ARTERIES },
      { label: 'Anterior intercostal vv. → internal thoracic v.', ko: '앞늑간정맥', colour: 'deepSky', parts: ANTERIOR_INTERCOSTAL_VEINS },
      { label: 'Internal thoracic a.', ko: '속가슴동맥', colour: 'paleRose', parts: INTERNAL_THORACIC_ARTERIES },
      { label: 'Superior intercostal a. (spaces 1–2)', ko: '위늑간동맥', colour: 'gold', parts: SUPERIOR_INTERCOSTAL_ARTERIES },
      { label: 'Intercostal nn. 1–2 (left)', ko: '늑간신경', colour: 'deepGold', parts: INTERCOSTAL_NERVES },
    ],
    soft: [...RIBS, ...COSTAL_CARTILAGES, ...STERNUM, ...THORACIC_VERTEBRAE, ...DESCENDING_THORACIC_AORTA],
    frame: [...RIBS, ...STERNUM],
    zoom: 1.1,
  },

  'mediastinal-nerves': {
    title: 'Phrenic and vagus nerves in the mediastinum',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Left phrenic n. — lateral', ko: '왼횡격신경 — 바깥쪽', colour: 'deepSage', parts: LEFT_PHRENIC },
      { label: 'Left vagus n.', ko: '왼미주신경', colour: 'deepGold', parts: LEFT_VAGUS },
      { label: 'Right vagus n.', ko: '오른미주신경', colour: 'deepRose', parts: RIGHT_VAGUS },
      { label: 'Recurrent laryngeal nn.', ko: '되돌이후두신경', colour: 'deepSky', parts: RECURRENT_LARYNGEAL },
    ],
    soft: [...AORTA.slice(0, 2), ...BRACHIOCEPHALIC_TRUNK, ...RIGHT_BRANCHES, ...LEFT_CCA, ...LEFT_SUBCLAVIAN, ...VEINS, ...HEART, ...TRACHEA],
    frame: [...LEFT_PHRENIC, ...LEFT_VAGUS, ...RIGHT_VAGUS, ...HEART],
    zoom: 1.1,
  },

  'heart-surfaces': {
    title: 'The heart and its great vessels',
    turn: 90,
    spin: true,
    groups: [
      { label: 'Ventricles', ko: '심실', colour: 'rose', parts: VENTRICLE_WALL },
      { label: 'Right atrium', ko: '우심방', colour: 'paleSky', parts: RA_WALL },
      { label: 'Left atrium', ko: '좌심방', colour: 'paleRose', parts: LA_WALL },
      { label: 'Aorta', ko: '대동맥', colour: 'gold', parts: AORTA.slice(0, 2) },
      { label: 'Pulmonary trunk & arteries', ko: '폐동맥', colour: 'slate', parts: PULMONARY_TRUNK },
      { label: 'Venae cavae', ko: '대정맥', colour: 'sky', parts: [...SVC, ...IVC] },
      { label: 'Pulmonary veins', ko: '폐정맥', colour: 'sage', parts: PULMONARY_VEINS },
    ],
    soft: DIAPHRAGM,
    frame: [...HEART_WALLS, ...AORTA.slice(0, 2), ...PULMONARY_TRUNK],
  },

  'heart-chambers': {
    title: 'Blood through the four chambers',
    turn: 0,
    spin: true,
    groups: [
      { label: '1 · Venae cavae', ko: '대정맥', colour: 'slate', parts: [...SVC, ...IVC] },
      { label: '2 · Right atrium', ko: '우심방', colour: 'paleSky', parts: RA_CAVITY },
      { label: '3 · Right ventricle', ko: '우심실', colour: 'sky', parts: RV_CAVITY },
      { label: '4 · Pulmonary trunk', ko: '폐동맥줄기', colour: 'deepSky', parts: PULMONARY_TRUNK },
      { label: '5 · Pulmonary veins', ko: '폐정맥', colour: 'deepRose', parts: PULMONARY_VEINS },
      { label: '6 · Left atrium', ko: '좌심방', colour: 'paleRose', parts: LA_CAVITY },
      { label: '7 · Left ventricle', ko: '좌심실', colour: 'rose', parts: LV_CAVITY },
      { label: '8 · Aorta', ko: '대동맥', colour: 'gold', parts: AORTA.slice(0, 2) },
    ],
    soft: HEART_WALLS,
    frame: [...HEART_WALLS, ...AORTA.slice(0, 2)],
  },

  'right-atrium': {
    title: 'Right atrium: three in, one out',
    turn: -60,
    spin: true,
    groups: [
      { label: 'Right atrium', ko: '우심방', colour: 'paleSky', parts: RA_WALL },
      { label: 'In · Superior vena cava', ko: '상대정맥', colour: 'sky', parts: SVC },
      { label: 'In · Inferior vena cava', ko: '하대정맥', colour: 'slate', parts: IVC },
      { label: 'In · Coronary sinus', ko: '관상정맥동', colour: 'gold', parts: CORONARY_SINUS },
      { label: 'Out · Tricuspid valve', ko: '삼첨판', colour: 'rose', parts: TRICUSPID },
    ],
    soft: without(HEART_WALLS, RA_WALL),
    frame: [...RA_WALL, ...SVC, ...TRICUSPID],
  },

  'left-atrium': {
    title: 'Left atrium: the most posterior chamber',
    turn: 160,
    spin: true,
    groups: [
      { label: 'Left atrium', ko: '좌심방', colour: 'rose', parts: LA_WALL },
      { label: 'In · Four pulmonary veins', ko: '폐정맥 네 개', colour: 'paleRose', parts: PULMONARY_VEINS },
      { label: 'Out · Mitral valve', ko: '승모판', colour: 'gold', parts: MITRAL },
      { label: 'Oesophagus — right behind it', ko: '식도', colour: 'sage', parts: ESOPHAGUS },
    ],
    soft: [...without(HEART_WALLS, LA_WALL), ...DESCENDING_THORACIC_AORTA],
    frame: [...HEART_WALLS],
  },

  ventricles: {
    title: 'The two ventricles and their four valves',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Right ventricle', ko: '우심실', colour: 'sky', parts: RV_CAVITY },
      { label: 'Left ventricle', ko: '좌심실', colour: 'rose', parts: LV_CAVITY },
      { label: 'Tricuspid valve — RV inflow', ko: '삼첨판', colour: 'paleSky', parts: TRICUSPID },
      { label: 'Pulmonary valve — RV outflow', ko: '폐동맥판', colour: 'slate', parts: PULMONARY_VALVE },
      { label: 'Mitral valve — LV inflow', ko: '승모판', colour: 'paleRose', parts: MITRAL },
      { label: 'Aortic valve — LV outflow', ko: '대동맥판', colour: 'gold', parts: AORTIC_VALVE },
    ],
    soft: HEART_WALLS,
    frame: HEART_WALLS,
  },

  'papillary-muscles': {
    title: 'Five papillary muscles',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Right ventricle — anterior, posterior, septal', ko: '우심실 유두근 3', colour: 'sky', parts: RV_PAPILLARY },
      { label: 'Left ventricle — anterior, posterior', ko: '좌심실 유두근 2', colour: 'rose', parts: LV_PAPILLARY },
      { label: 'Tricuspid valve', ko: '삼첨판', colour: 'paleSky', parts: TRICUSPID },
      { label: 'Mitral valve', ko: '승모판', colour: 'paleRose', parts: MITRAL },
    ],
    soft: HEART_WALLS,
    frame: [...RV_PAPILLARY, ...LV_PAPILLARY, ...TRICUSPID, ...MITRAL],
    zoom: 0.9,
  },

  'aortic-root': {
    title: 'Aortic root and the coronary openings',
    turn: 20,
    spin: true,
    groups: [
      { label: 'Aortic valve — three cusps', ko: '대동맥판', colour: 'gold', parts: AORTIC_VALVE },
      { label: 'Left coronary a. (trunk)', ko: '왼관상동맥', colour: 'rose', parts: ['FMA3855'] },
      { label: 'Right coronary a. (trunk)', ko: '오른관상동맥', colour: 'deepRose', parts: ['FMA3802'] },
      { label: 'Ascending aorta', ko: '상행대동맥', colour: 'paleRose', parts: ['FMA3736'] },
    ],
    soft: [...HEART_WALLS, ...PULMONARY_VALVE],
    frame: [...AORTIC_VALVE, 'FMA3855', 'FMA3802', 'FMA3736'],
    zoom: 0.9,
  },

  'coronary-vessels': {
    title: 'Coronary arteries and cardiac veins',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Left coronary a. and branches', ko: '왼관상동맥', colour: 'rose', parts: LCA },
      { label: 'Right coronary a. and branches', ko: '오른관상동맥', colour: 'gold', parts: RCA },
      { label: 'Great cardiac v.', ko: '큰심장정맥', colour: 'deepSky', parts: GREAT_CARDIAC_VEIN },
      { label: 'Middle, small & posterior cardiac vv.', ko: '중간·작은·뒤 심장정맥', colour: 'paleSky', parts: SMALL_MIDDLE_CARDIAC_VEINS },
      { label: 'Anterior cardiac v. — into the RA', ko: '앞심장정맥', colour: 'sage', parts: ANTERIOR_CARDIAC_VEIN },
      { label: 'Coronary sinus', ko: '관상정맥동', colour: 'slate', parts: CORONARY_SINUS },
    ],
    soft: [...HEART_WALLS, ...AORTA.slice(0, 1), ...PULMONARY_TRUNK.slice(0, 1)],
    frame: HEART_WALLS,
  },

  'valves-from-above': {
    title: 'The four valves from above',
    turn: 0,
    tilt: 80,
    spin: false,
    groups: [
      { label: 'Pulmonary valve', ko: '폐동맥판', colour: 'slate', parts: PULMONARY_VALVE },
      { label: 'Aortic valve', ko: '대동맥판', colour: 'gold', parts: AORTIC_VALVE },
      { label: 'Mitral valve', ko: '승모판', colour: 'rose', parts: MITRAL },
      { label: 'Tricuspid valve', ko: '삼첨판', colour: 'sky', parts: TRICUSPID },
    ],
    soft: VENTRICLE_WALL,
    frame: [...PULMONARY_VALVE, ...AORTIC_VALVE, ...MITRAL, ...TRICUSPID],
    zoom: 0.9,
  },
}

// Parts the figures need, with a triangle budget for each.
export const VIEW_PARTS = {}
for (const view of Object.values(VIEWS)) {
  for (const id of view.soft ?? []) VIEW_PARTS[id] ??= 0
  for (const g of view.groups) for (const id of g.parts) VIEW_PARTS[id] = Math.max(VIEW_PARTS[id] ?? 0, g.detail ?? 0)
}
