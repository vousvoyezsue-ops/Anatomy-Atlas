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

// Topic 18 — the lungs
const RUL = ['FMA7333']
const RML = ['FMA7383']
const RLL = ['FMA7337']
const LUL = ['FMA7370']
const LLL = ['FMA7371']
const RIGHT_LOBES = [...RUL, ...RML, ...RLL]
const LEFT_LOBES = [...LUL, ...LLL]
const LUNG_LOBES = [...RIGHT_LOBES, ...LEFT_LOBES]
const PULMONARY_ARTERIES = ['FMA50872', 'FMA50873']
const SEGMENTAL_ARTERIES = [
  'FMA13279', 'FMA68197', 'FMA68662', 'FMA68665', 'FMA68670', 'FMA68673', 'FMA68677', 'FMA68683', 'FMA68690', 'FMA68691',
  'FMA68693', 'FMA68694', 'FMA68706', 'FMA68709', 'FMA68712', 'FMA68723', 'FMA68725', 'FMA68728', 'FMA68735', 'FMA68738',
  'FMA68741', 'FMA8620', 'FMA8634', 'FMA8635', 'FMA8639', 'FMA8640', 'FMA8642', 'FMA8644', 'FMA8645', 'FMA8646', 'FMA8647',
]
const SEGMENTAL_VEINS = [
  'FMA68880', 'FMA68921', 'FMA68926', 'FMA68928', 'FMA68944', 'FMA68945', 'FMA68982', 'FMA68983', 'FMA8662', 'FMA8663',
  'FMA8667', 'FMA8668', 'FMA8669', 'FMA8670', 'FMA8673', 'FMA8678', 'FMA8681', 'FMA9422', 'FMA9425', 'FMA9428',
  'FMA9437', 'FMA9438', 'FMA9450', 'FMA9451',
]
// Segmental bronchial trees, one per bronchopulmonary segment.
const RIGHT_SEGMENTS = [
  ['S1 · Apical', '첨구역', 'FMA68211'],
  ['S2 · Posterior', '후구역', 'FMA68213'],
  ['S3 · Anterior', '전구역', 'FMA68212'],
  ['S4 · Lateral (middle lobe)', '외측구역', 'FMA68215'],
  ['S5 · Medial (middle lobe)', '내측구역', 'FMA68214'],
  ['S6 · Superior', '상구역', 'FMA68216'],
  ['S7 · Medial basal', '내측폐저구역', 'FMA68218'],
  ['S8 · Anterior basal', '전폐저구역', 'FMA68321'],
  ['S9 · Lateral basal', '외측폐저구역', 'FMA68220'],
  ['S10 · Posterior basal', '후폐저구역', 'FMA68221'],
]
const LEFT_SEGMENTS = [
  ['S1 · Apical', '첨구역', 'FMA68223'],
  ['S2 · Posterior', '후구역', 'FMA68225'],
  ['S3 · Anterior', '전구역', 'FMA68222'],
  ['S4 · Superior lingular', '상설구역', 'FMA68226'],
  ['S5 · Inferior lingular', '하설구역', 'FMA68227'],
  ['S6 · Superior', '상구역', 'FMA68228'],
  ['S7 · Medial basal', '내측폐저구역', 'FMA68230'],
  ['S8 · Anterior basal', '전폐저구역', 'FMA68231'],
  ['S9 · Lateral basal', '외측폐저구역', 'FMA68232'],
  ['S10 · Posterior basal', '후폐저구역', 'FMA68233'],
]
const SEGMENT_COLOURS = ['paleSky', 'sky', 'deepSky', 'sage', 'deepSage', 'gold', 'deepGold', 'paleRose', 'rose', 'deepRose']
const segmentGroups = (list) =>
  list.map(([label, ko, id], i) => ({ label, ko, colour: SEGMENT_COLOURS[i], parts: [id] }))
const RIGHT_SEGMENT_TREES = RIGHT_SEGMENTS.map((s) => s[2])
const LEFT_SEGMENT_TREES = LEFT_SEGMENTS.map((s) => s[2])

// Splanchnology 2, topics 1–3 — regions, abdominal wall, peritoneum
const STOMACH = ['FMA7148']
const SPLEEN = ['FMA7196']
const GALLBLADDER = ['FMA7202']
const PANCREAS = ['FMA7198']
const DUODENUM = ['FMA7206']
const JEJUNUM = ['FMA7207']
const ILEUM = ['FMA7208']
const SMALL_INTESTINE = [...JEJUNUM, ...ILEUM]
const ASCENDING_COLON = ['FMA14545']
const TRANSVERSE_COLON = ['FMA14546']
const DESCENDING_COLON = ['FMA14547']
const APPENDIX = ['FMA14542']
const RECTUM = ['FMA14544']
const LIVER = ['FMA7197']
const KIDNEYS = ['FMA7204', 'FMA7205']
const ADRENALS = ['FMA15629', 'FMA15630']
const URETERS = ['FMA15571', 'FMA15572']
const BLADDER = ['FMA15900']
const PROSTATE = ['FMA9600']
const HIP_BONES = ['FMA16586', 'FMA16587']
const SACRUM = ['FMA16202']
const RECTUS_ABDOMINIS = ['FMA13377', 'FMA13378']
const EXTERNAL_OBLIQUE = ['FMA13336', 'FMA13337']
const INTERNAL_OBLIQUE = ['FMA13892', 'FMA13893']
const TRANSVERSUS_ABDOMINIS = ['FMA22344', 'FMA22345']
const LINEA_ALBA = ['FMA11336']
const INGUINAL_LIGAMENTS = ['FMA21964', 'FMA21965']
const PSOAS = ['FMA22342', 'FMA22343']
const ILIACUS = ['FMA22322', 'FMA22323']
const MESENTERY = ['FMA14643']
const TRANSVERSE_MESOCOLON = ['FMA14647']
const MESOAPPENDIX = ['FMA16549']
const POSTERIOR_PERITONEUM = ['FMA19757']

// Splanchnology 2, topics 4–6 — stomach, diaphragm, hepatoduodenal ligament and lesser sac
const LEFT_KIDNEY = ['FMA7205']
const LEFT_ADRENAL = ['FMA15630']
const CELIAC = ['FMA50737']
const LEFT_GASTRIC_A = ['FMA14768']
const RIGHT_GASTRIC_A = ['FMA14776']
const SPLENIC_A = ['FMA14773']
const COMMON_HEPATIC_A = ['FMA14771']
const PROPER_HEPATIC_A = ['FMA14772']
const GASTRODUODENAL_A = ['FMA76574']
const PANCREATICODUODENAL_AA = ['FMA14782', 'FMA14784', 'FMA14805', 'FMA70479', 'FMA70480']
const GASTROEPIPLOIC_VV = ['FMA15390', 'FMA15397']
const GASTRIC_VV = ['FMA15399', 'FMA15400']
const SPLENIC_V = ['FMA14331']
const PORTAL_V = ['FMA50735']
const BILE_DUCTS = ['FMA14668', 'FMA14539', 'FMA14669', 'FMA14670'] // common hepatic, cystic, right and left hepatic ducts
const CAUDATE_LOBE = ['FMA13365']
const LIVER_WITHOUT_CAUDATE = ['FMA15739', 'FMA15741', 'FMA15742', 'FMA15743', 'FMA15744', 'FMA15745', 'FMA15746', 'FMA15747']
const T8_T10_T12 = ['FMA9991', 'FMA10037', 'FMA10081']

// Splanchnology 2, topics 7–9 — liver and spleen
const RIGHT_LOBE = ['FMA15743', 'FMA15744', 'FMA15745', 'FMA15746'] // segments V–VIII
const LEFT_LOBE = ['FMA15739', 'FMA15741'] // segments II–III, left of the falciform ligament
const QUADRATE = ['FMA15742'] // segment IV
const CAUDATE = ['FMA13365'] // segment I
const RIGHT_HEPATIC_V = ['FMA14338', 'FMA15796', 'FMA15797', 'FMA15798']
const MIDDLE_HEPATIC_V = ['FMA14340', 'FMA15793', 'FMA15800', 'FMA15801']
const LEFT_HEPATIC_V = ['FMA14339', 'FMA15802', 'FMA15803', 'FMA15804']
const RIGHT_KIDNEY = ['FMA7204']
const RIGHT_ADRENAL = ['FMA15629']
const RIGHT_FIFTH_RIB = ['FMA8066']
const LEFT_RIBS_9_11 = ['FMA8391', 'FMA8472', 'FMA8532']

// Splanchnology 2, topics 10–11 — duodenum, pancreas and intestines
const SMA = ['FMA14749', 'FMA66358']
const SMV = ['FMA14332']
const IMV = ['FMA15391']
const LEFT_RENAL_V = ['FMA14336']
const PANCREATIC_DUCT = ['FMA10419']
const L1 = ['FMA13072']
const L3 = ['FMA13074']

// Splanchnology 2, topics 12–15 — unpaired arteries, lymph, portal vein
const T12 = ['FMA10081']
const IMA = ['FMA14750', 'FMA66359']
const MIDDLE_COLIC_A = ['FMA14810']
const RIGHT_COLIC_A = ['FMA14811']
const ILEOCOLIC_A = ['FMA14815', 'FMA14819', 'FMA14820']
const APPENDICULAR_A = ['FMA14818']
const ILEAL_A = ['FMA14809']
const INF_PANCREATICODUODENAL_A = ['FMA14805']
const LEFT_COLIC_A = ['FMA14826', 'FMA14828', 'FMA14829']
const SIGMOID_A = ['FMA14830']
const SUP_RECTAL_A = ['FMA14832']
const MARGINAL_A = ['FMA14831', 'FMA14824']
const SMV_TRIBUTARIES = ['FMA15406', 'FMA15407', 'FMA15408', 'FMA15405', 'FMA15397', 'FMA15398']
const IMV_TRIBUTARIES = ['FMA15394', 'FMA15395', 'FMA15393']
const COLON = [...ASCENDING_COLON, ...TRANSVERSE_COLON, ...DESCENDING_COLON]

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

  'lung-lobes': {
    title: 'Lobes of both lungs',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Right upper lobe', ko: '우상엽', colour: 'paleSky', parts: RUL },
      { label: 'Right middle lobe', ko: '우중엽', colour: 'sage', parts: RML },
      { label: 'Right lower lobe', ko: '우하엽', colour: 'sky', parts: RLL },
      { label: 'Left upper lobe — with the lingula', ko: '좌상엽 · 소설', colour: 'paleRose', parts: LUL },
      { label: 'Left lower lobe', ko: '좌하엽', colour: 'rose', parts: LLL },
    ],
    soft: [...TRACHEA, ...MAIN_BRONCHI, ...HEART_WALLS],
    frame: LUNG_LOBES,
  },

  'lung-impressions': {
    title: 'What touches the mediastinal surfaces',
    turn: 90,
    spin: true,
    groups: [
      { label: 'Heart — cardiac impression', ko: '심장', colour: 'rose', parts: HEART_WALLS },
      { label: 'Aorta — arch and descending', ko: '대동맥', colour: 'gold', parts: [...AORTA.slice(1, 2), ...DESCENDING_THORACIC_AORTA] },
      { label: 'Oesophagus', ko: '식도', colour: 'sage', parts: ESOPHAGUS },
      { label: 'Superior vena cava & azygos v.', ko: '상대정맥 · 홀정맥', colour: 'sky', parts: [...SVC, ...AZYGOS] },
      { label: 'Trachea', ko: '기관', colour: 'cartilage', parts: TRACHEA },
    ],
    soft: LUNG_LOBES,
    frame: LUNG_LOBES,
  },

  'pulmonary-root': {
    title: 'What passes through the hilum',
    turn: 90,
    spin: true,
    groups: [
      { label: 'Main bronchus', ko: '주기관지', colour: 'sage', parts: MAIN_BRONCHI },
      { label: 'Pulmonary artery', ko: '폐동맥', colour: 'deepSky', parts: PULMONARY_ARTERIES },
      { label: 'Pulmonary veins', ko: '폐정맥', colour: 'deepRose', parts: PULMONARY_VEINS },
      { label: 'Bronchial artery', ko: '기관지동맥', colour: 'gold', parts: BRONCHIAL_ARTERY },
    ],
    soft: [...TRACHEA, ...PULMONARY_TRUNK.slice(0, 1), ...HEART_WALLS],
    frame: [...MAIN_BRONCHI, ...PULMONARY_ARTERIES, ...PULMONARY_VEINS],
    zoom: 0.9,
  },

  'bronchial-tree': {
    title: 'Bronchial tree, lobe by lobe',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Trachea', ko: '기관', colour: 'cartilage', parts: TRACHEA },
      { label: 'Main bronchi', ko: '주기관지', colour: 'slate', parts: MAIN_BRONCHI },
      { label: 'Right upper lobe — 3 segments', ko: '우상엽', colour: 'paleSky', parts: RIGHT_SEGMENT_TREES.slice(0, 3) },
      { label: 'Right middle lobe — 2', ko: '우중엽', colour: 'sage', parts: RIGHT_SEGMENT_TREES.slice(3, 5) },
      { label: 'Right lower lobe — 5', ko: '우하엽', colour: 'sky', parts: RIGHT_SEGMENT_TREES.slice(5) },
      { label: 'Left upper lobe — 5 incl. lingula', ko: '좌상엽', colour: 'paleRose', parts: LEFT_SEGMENT_TREES.slice(0, 5) },
      { label: 'Left lower lobe — 5', ko: '좌하엽', colour: 'rose', parts: LEFT_SEGMENT_TREES.slice(5) },
    ],
    soft: LUNG_LOBES,
    frame: LUNG_LOBES,
  },

  'segments-right': {
    title: 'Bronchopulmonary segments, right lung',
    turn: -90,
    spin: true,
    groups: segmentGroups(RIGHT_SEGMENTS),
    soft: RIGHT_LOBES,
    frame: RIGHT_LOBES,
  },

  'segments-left': {
    title: 'Bronchopulmonary segments, left lung',
    turn: 90,
    spin: true,
    groups: segmentGroups(LEFT_SEGMENTS),
    soft: LEFT_LOBES,
    frame: LEFT_LOBES,
  },

  'pulmonary-circulation': {
    title: 'Two circulations in the lungs',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Pulmonary arteries → segmental', ko: '폐동맥 (기능)', colour: 'deepSky', parts: [...PULMONARY_TRUNK, ...SEGMENTAL_ARTERIES] },
      { label: 'Pulmonary veins ← segmental', ko: '폐정맥 (기능)', colour: 'deepRose', parts: [...PULMONARY_VEINS, ...SEGMENTAL_VEINS] },
      { label: 'Bronchial artery ← thoracic aorta', ko: '기관지동맥 (영양)', colour: 'gold', parts: BRONCHIAL_ARTERY },
    ],
    soft: [...HEART_WALLS, ...DESCENDING_THORACIC_AORTA, ...AORTA.slice(0, 2), ...TRACHEA, ...MAIN_BRONCHI, ...LUNG_LOBES],
    frame: LUNG_LOBES,
  },

  'abdominal-viscera': {
    title: 'Abdominal viscera from the front',
    turn: 0,
    spin: false,
    zoom: 0.9,
    groups: [
      { label: 'Liver & gallbladder', ko: '간 · 쓸개', colour: 'rose', parts: [...LIVER, ...GALLBLADDER] },
      { label: 'Stomach', ko: '위', colour: 'gold', parts: STOMACH },
      { label: 'Spleen', ko: '지라', colour: 'deepRose', parts: SPLEEN },
      { label: 'Small intestine', ko: '소장', colour: 'paleRose', parts: [...DUODENUM, ...SMALL_INTESTINE] },
      { label: 'Large intestine', ko: '대장', colour: 'sage', parts: [...ASCENDING_COLON, ...TRANSVERSE_COLON, ...DESCENDING_COLON, ...APPENDIX, ...RECTUM] },
      { label: 'Kidneys', ko: '콩팥', colour: 'slate', parts: KIDNEYS },
      { label: 'Urinary bladder', ko: '방광', colour: 'sky', parts: BLADDER },
    ],
    soft: [...HIP_BONES, ...SACRUM, ...LUMBAR_VERTEBRAE, ...RIBS, ...COSTAL_CARTILAGES],
    frame: [...LIVER, ...STOMACH, ...SMALL_INTESTINE, ...BLADDER, ...HIP_BONES],
  },

  'abdominal-wall': {
    title: 'Muscles of the abdominal wall',
    turn: 0,
    spin: true,
    zoom: 0.85,
    groups: [
      { label: 'Rectus abdominis', ko: '배곧은근', colour: 'rose', parts: RECTUS_ABDOMINIS },
      { label: 'External oblique (right side)', ko: '배바깥빗근 · 오른쪽', colour: 'gold', parts: ['FMA13336'] },
      { label: 'Internal oblique (left side, outer layer removed)', ko: '배속빗근 · 왼쪽', colour: 'sage', parts: ['FMA13893'] },
      { label: 'Transversus abdominis', ko: '배가로근', colour: 'sky', parts: TRANSVERSUS_ABDOMINIS },
      { label: 'Linea alba', ko: '백색선', colour: 'cartilage', parts: LINEA_ALBA },
      { label: 'Inguinal ligament', ko: '샅고랑인대', colour: 'deepGold', parts: INGUINAL_LIGAMENTS },
      { label: 'Posterior wall — psoas major & iliacus', ko: '뒤벽 · 큰허리근 · 엉덩근', colour: 'slate', parts: [...PSOAS, ...ILIACUS] },
    ],
    soft: [...HIP_BONES, ...SACRUM, ...LUMBAR_VERTEBRAE, ...RIBS, ...COSTAL_CARTILAGES],
    frame: [...RECTUS_ABDOMINIS, ...EXTERNAL_OBLIQUE, ...HIP_BONES],
    // Like an atlas plate: the right side shows the outer layer, the left one layer deeper.
  },

  'peritoneal-relations': {
    title: 'Intra-, retro- and infraperitoneal organs',
    turn: 150,
    spin: true,
    groups: [
      { label: 'Intraperitoneal', ko: '복막내', colour: 'rose', parts: [...LIVER, ...STOMACH, ...SPLEEN, ...GALLBLADDER, ...SMALL_INTESTINE, ...TRANSVERSE_COLON, ...APPENDIX] },
      { label: 'Secondary retroperitoneal', ko: '이차 복막뒤', colour: 'gold', parts: [...DUODENUM, ...PANCREAS, ...ASCENDING_COLON, ...DESCENDING_COLON] },
      { label: 'Primary retroperitoneal', ko: '일차 복막뒤', colour: 'sky', parts: [...KIDNEYS, ...ADRENALS, ...URETERS, ...ABDOMINAL_AORTA, ...IVC] },
      { label: 'Infraperitoneal', ko: '복막아래', colour: 'sage', parts: [...BLADDER, ...PROSTATE, ...RECTUM] },
      { label: 'Posterior parietal peritoneum', ko: '뒤 벽측 복막', colour: 'paleRose', parts: POSTERIOR_PERITONEUM },
    ],
    soft: [...HIP_BONES, ...SACRUM, ...LUMBAR_VERTEBRAE],
    frame: [...LIVER, ...STOMACH, ...KIDNEYS, ...BLADDER, ...HIP_BONES],
  },

  mesenteries: {
    title: 'Mesentery, transverse mesocolon and mesoappendix',
    turn: 20,
    spin: true,
    groups: [
      { label: 'Mesentery — small intestine', ko: '창자간막', colour: 'gold', parts: MESENTERY },
      { label: 'Transverse mesocolon', ko: '가로잘록창자간막', colour: 'sky', parts: TRANSVERSE_MESOCOLON },
      { label: 'Mesoappendix', ko: '막창자꼬리간막', colour: 'rose', parts: MESOAPPENDIX },
      { label: 'Jejunum & ileum', ko: '빈창자 · 돌창자', colour: 'paleRose', parts: SMALL_INTESTINE },
      { label: 'Transverse colon & appendix', ko: '가로잘록창자 · 막창자꼬리', colour: 'paleSky', parts: [...TRANSVERSE_COLON, ...APPENDIX] },
    ],
    soft: [...DUODENUM, ...PANCREAS, ...ASCENDING_COLON, ...DESCENDING_COLON, ...POSTERIOR_PERITONEUM, ...LUMBAR_VERTEBRAE],
    frame: [...MESENTERY, ...TRANSVERSE_MESOCOLON, ...SMALL_INTESTINE],
  },

  'stomach-bed': {
    title: 'The stomach bed',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Pancreas', ko: '이자', colour: 'rose', parts: PANCREAS },
      { label: 'Spleen', ko: '지라', colour: 'deepRose', parts: SPLEEN },
      { label: 'Left kidney & suprarenal gland', ko: '왼콩팥 · 부신', colour: 'slate', parts: [...LEFT_KIDNEY, ...LEFT_ADRENAL] },
      { label: 'Transverse colon & mesocolon', ko: '가로잘록창자 · 간막', colour: 'sage', parts: [...TRANSVERSE_COLON, ...TRANSVERSE_MESOCOLON] },
      { label: 'Splenic artery', ko: '지라동맥', colour: 'gold', parts: SPLENIC_A },
    ],
    soft: [...STOMACH, ...LIVER, ...DUODENUM],
    frame: [...STOMACH, ...PANCREAS, ...SPLEEN, ...LEFT_KIDNEY],
    zoom: 0.9,
  },

  'stomach-arteries': {
    title: 'Arteries of the stomach from the celiac trunk',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Celiac trunk (T12)', ko: '복강동맥', colour: 'deepGold', parts: CELIAC },
      { label: 'Left gastric a.', ko: '왼위동맥', colour: 'deepRose', parts: LEFT_GASTRIC_A },
      { label: 'Splenic a.', ko: '지라동맥', colour: 'rose', parts: SPLENIC_A },
      { label: 'Common & proper hepatic a.', ko: '온간 · 고유간동맥', colour: 'gold', parts: [...COMMON_HEPATIC_A, ...PROPER_HEPATIC_A] },
      { label: 'Right gastric a.', ko: '오른위동맥', colour: 'sage', parts: RIGHT_GASTRIC_A },
      { label: 'Gastroduodenal & pancreaticoduodenal aa.', ko: '위샘창자 · 이자샘창자동맥', colour: 'sky', parts: [...GASTRODUODENAL_A, ...PANCREATICODUODENAL_AA] },
      { label: 'Gastro-omental (gastroepiploic) vv. — greater curvature', ko: '위그물막정맥', colour: 'slate', parts: GASTROEPIPLOIC_VV },
    ],
    soft: [...STOMACH, ...SPLEEN, ...PANCREAS, ...DUODENUM, ...ABDOMINAL_AORTA],
    frame: [...STOMACH, ...DUODENUM],
    zoom: 1.4,
  },

  'diaphragm-apertures': {
    title: 'Three apertures of the diaphragm',
    turn: 20,
    spin: true,
    groups: [
      { label: 'IVC — caval opening, T8', ko: '하대정맥 · T8', colour: 'sky', parts: IVC },
      { label: 'Oesophagus — oesophageal hiatus, T10', ko: '식도 · T10', colour: 'sage', parts: ESOPHAGUS },
      { label: 'Aorta — aortic hiatus, T12', ko: '대동맥 · T12', colour: 'gold', parts: [...DESCENDING_THORACIC_AORTA, ...ABDOMINAL_AORTA] },
      { label: 'Vagal trunks — with the oesophagus', ko: '미주신경', colour: 'deepGold', parts: [...LEFT_VAGUS, ...RIGHT_VAGUS] },
      { label: 'Left phrenic n. — pierces the muscle', ko: '왼횡격신경', colour: 'deepSage', parts: LEFT_PHRENIC },
      { label: 'T8 · T10 · T12', ko: '흉추', colour: 'ivory', parts: T8_T10_T12 },
    ],
    // The diaphragm is faint so the three structures can be seen passing through it.
    soft: [...DIAPHRAGM, ...THORACIC_VERTEBRAE, ...LUMBAR_VERTEBRAE, ...PSOAS],
    frame: [...DIAPHRAGM, ...T8_T10_T12],
    zoom: 0.9,
  },

  'epiploic-foramen': {
    title: 'The epiploic foramen and the portal triad',
    turn: -35,
    spin: true,
    groups: [
      { label: 'Portal v. — behind', ko: '간문맥', colour: 'sky', parts: PORTAL_V },
      { label: 'Proper (and common) hepatic a.', ko: '고유간동맥', colour: 'rose', parts: [...PROPER_HEPATIC_A, ...COMMON_HEPATIC_A] },
      { label: 'Bile ducts — hepatic and cystic ducts', ko: '간관 · 쓸개관', colour: 'gold', parts: BILE_DUCTS },
      { label: 'IVC — posterior border of the foramen', ko: '하대정맥 · 뒤', colour: 'slate', parts: IVC },
      { label: 'Caudate lobe — superior border', ko: '꼬리엽 · 위', colour: 'paleRose', parts: CAUDATE_LOBE },
      { label: 'Duodenum — inferior border', ko: '샘창자 · 아래', colour: 'sage', parts: DUODENUM },
    ],
    soft: [...LIVER_WITHOUT_CAUDATE, ...GALLBLADDER, ...STOMACH, ...PANCREAS],
    frame: [...PORTAL_V, ...CAUDATE_LOBE, ...BILE_DUCTS],
    zoom: 1,
  },
  'liver-skeletotopy': {
    title: 'The liver behind the ribs',
    turn: 0,
    spin: false,
    groups: [
      { label: 'Right lobe', ko: '오른엽', colour: 'rose', parts: RIGHT_LOBE },
      { label: 'Left lobe', ko: '왼엽', colour: 'paleRose', parts: LEFT_LOBE },
      { label: 'Quadrate part (segment IV)', ko: '네모엽', colour: 'deepGold', parts: QUADRATE },
      { label: 'Caudate lobe', ko: '꼬리엽', colour: 'deepRose', parts: CAUDATE },
      { label: 'Gallbladder — fundus at the costal arch', ko: '쓸개', colour: 'sage', parts: GALLBLADDER },
      { label: 'Right 5th rib — upper margin', ko: '오른 제5늑골', colour: 'gold', parts: RIGHT_FIFTH_RIB },
    ],
    soft: [...RIBS, ...COSTAL_CARTILAGES, ...STERNUM],
    frame: [...LIVER_WITHOUT_CAUDATE, ...RIGHT_FIFTH_RIB],
    zoom: 0.95,
  },

  'liver-visceral': {
    title: 'Visceral surface of the liver',
    turn: 180,
    tilt: -50,
    spin: false,
    groups: [
      { label: 'Right and left lobes', ko: '오른엽 · 왼엽', colour: 'paleRose', parts: [...RIGHT_LOBE, ...LEFT_LOBE] },
      { label: 'Caudate lobe', ko: '꼬리엽', colour: 'deepRose', parts: CAUDATE },
      { label: 'Segment IV — quadrate lobe is its lower part', ko: '네모엽', colour: 'deepGold', parts: QUADRATE },
      { label: 'Gallbladder', ko: '쓸개', colour: 'sage', parts: GALLBLADDER },
      { label: 'Portal v. — porta hepatis', ko: '간문맥', colour: 'sky', parts: PORTAL_V },
      { label: 'Proper hepatic a.', ko: '고유간동맥', colour: 'rose', parts: PROPER_HEPATIC_A },
      { label: 'Hepatic and cystic ducts', ko: '간관 · 쓸개관', colour: 'gold', parts: BILE_DUCTS },
    ],
    soft: [...IVC, 'FMA15747'],
    frame: [...LIVER_WITHOUT_CAUDATE],
    zoom: 1,
  },

  'hepatic-veins': {
    title: 'Three hepatic veins into the IVC',
    turn: 0,
    tilt: 15,
    spin: true,
    groups: [
      { label: 'Right hepatic v.', ko: '오른간정맥', colour: 'deepSky', parts: RIGHT_HEPATIC_V },
      { label: 'Intermediate (middle) hepatic v.', ko: '중간간정맥', colour: 'sky', parts: MIDDLE_HEPATIC_V },
      { label: 'Left hepatic v.', ko: '왼간정맥', colour: 'paleSky', parts: LEFT_HEPATIC_V },
      { label: 'IVC', ko: '하대정맥', colour: 'slate', parts: IVC },
      { label: 'Portal v. — in, at the porta', ko: '간문맥 · 들어감', colour: 'gold', parts: PORTAL_V },
    ],
    soft: [...LIVER_WITHOUT_CAUDATE, ...CAUDATE_LOBE],
    frame: [...LIVER_WITHOUT_CAUDATE],
    zoom: 1,
  },

  'liver-impressions': {
    title: 'What presses on the visceral surface',
    turn: 180,
    tilt: -72,
    spin: false,
    groups: [
      { label: 'Liver', ko: '간', colour: 'paleRose', parts: [...LIVER_WITHOUT_CAUDATE, ...CAUDATE_LOBE] },
      { label: 'Oesophagus', ko: '식도', colour: 'deepSage', parts: ESOPHAGUS },
      { label: 'Stomach — gastric impression', ko: '위', colour: 'gold', parts: STOMACH },
      { label: 'Duodenum', ko: '샘창자', colour: 'sage', parts: DUODENUM },
      { label: 'Right colic flexure', ko: '오른결장굽이', colour: 'deepGold', parts: ASCENDING_COLON },
      { label: 'Right kidney', ko: '오른콩팥', colour: 'rose', parts: RIGHT_KIDNEY },
      { label: 'Right suprarenal gland', ko: '오른부신', colour: 'deepRose', parts: RIGHT_ADRENAL },
    ],
    frame: [...LIVER_WITHOUT_CAUDATE, ...RIGHT_KIDNEY],
    zoom: 1,
  },

  'spleen-relations': {
    title: 'The spleen and its neighbours',
    turn: 150,
    spin: true,
    groups: [
      { label: 'Spleen', ko: '지라', colour: 'rose', parts: SPLEEN },
      { label: 'Stomach — gastric surface', ko: '위', colour: 'gold', parts: STOMACH },
      { label: 'Left kidney — renal surface', ko: '왼콩팥', colour: 'paleSky', parts: LEFT_KIDNEY },
      { label: 'Tail of pancreas', ko: '이자꼬리', colour: 'deepGold', parts: PANCREAS },
      { label: 'Left colic flexure — colic surface', ko: '왼결장굽이', colour: 'sage', parts: [...TRANSVERSE_COLON, ...DESCENDING_COLON] },
      { label: 'Splenic a. — coiled', ko: '지라동맥', colour: 'deepSage', parts: SPLENIC_A },
      { label: 'Splenic v.', ko: '지라정맥', colour: 'sky', parts: SPLENIC_V },
      { label: 'Left ribs 9–11', ko: '왼 제9–11늑골', colour: 'ivory', parts: LEFT_RIBS_9_11 },
    ],
    soft: LEFT_ADRENAL,
    frame: [...SPLEEN, ...LEFT_KIDNEY, ...PANCREAS],
    zoom: 0.85,
  },
  'pancreas-duodenum': {
    title: 'Duodenum and pancreas',
    turn: 0,
    spin: false,
    groups: [
      { label: 'Duodenum — C around the head', ko: '샘창자', colour: 'sage', parts: DUODENUM },
      { label: 'Pancreas — head, body, tail', ko: '이자', colour: 'gold', parts: PANCREAS },
      { label: 'Superior mesenteric a.', ko: '위창자간막동맥', colour: 'rose', parts: SMA },
      { label: 'Superior mesenteric v.', ko: '위창자간막정맥', colour: 'sky', parts: SMV },
      { label: 'L1 · L3', ko: '제1 · 3허리뼈', colour: 'ivory', parts: [...L1, ...L3] },
    ],
    soft: [...SPLEEN, ...KIDNEYS, ...ABDOMINAL_AORTA, ...IVC],
    frame: [...DUODENUM, ...PANCREAS],
    zoom: 1,
  },

  'pancreatic-duct': {
    title: 'Pancreatic duct and bile ducts',
    turn: 0,
    spin: true,
    groups: [
      { label: 'Main pancreatic duct (of Wirsung)', ko: '주이자관', colour: 'deepGold', parts: PANCREATIC_DUCT },
      { label: 'Hepatic and cystic ducts', ko: '간관 · 쓸개관', colour: 'sage', parts: BILE_DUCTS },
      { label: 'Gallbladder', ko: '쓸개', colour: 'deepSage', parts: GALLBLADDER },
      { label: 'Duodenum', ko: '샘창자', colour: 'paleRose', parts: DUODENUM },
    ],
    soft: PANCREAS,
    frame: [...PANCREAS, ...DUODENUM, ...GALLBLADDER],
    zoom: 1,
  },

  'sma-angle': {
    title: 'The duodenum between the aorta and the SMA',
    turn: -90,
    spin: false,
    groups: [
      { label: 'Abdominal aorta', ko: '배대동맥', colour: 'gold', parts: ABDOMINAL_AORTA },
      { label: 'Superior mesenteric a.', ko: '위창자간막동맥', colour: 'rose', parts: SMA },
      { label: 'Duodenum — 3rd part in the angle', ko: '샘창자 수평부', colour: 'sage', parts: DUODENUM },
      { label: 'Left renal v. — also in the angle', ko: '왼콩팥정맥', colour: 'sky', parts: LEFT_RENAL_V },
      { label: 'L3', ko: '제3허리뼈', colour: 'ivory', parts: L3 },
    ],
    soft: [...PANCREAS, ...LUMBAR_VERTEBRAE],
    frame: [...DUODENUM, ...SMA, ...L3],
    zoom: 1,
  },

  'small-intestine': {
    title: 'Jejunum and ileum',
    turn: 0,
    spin: false,
    groups: [
      { label: 'Jejunum — upper left', ko: '빈창자', colour: 'sage', parts: JEJUNUM },
      { label: 'Ileum — lower right', ko: '돌창자', colour: 'sky', parts: ILEUM },
      { label: 'Duodenum', ko: '샘창자', colour: 'paleRose', parts: DUODENUM },
    ],
    soft: [...ASCENDING_COLON, ...TRANSVERSE_COLON, ...DESCENDING_COLON, ...RECTUM, ...APPENDIX, ...HIP_BONES],
    frame: [...JEJUNUM, ...ILEUM, ...TRANSVERSE_COLON],
    zoom: 0.95,
  },

  'large-intestine': {
    title: 'The large intestine framing the small',
    turn: 0,
    spin: false,
    groups: [
      { label: 'Caecum & ascending colon — retroperitoneal', ko: '막창자 · 오름잘록창자', colour: 'rose', parts: ASCENDING_COLON },
      { label: 'Vermiform appendix', ko: '막창자꼬리', colour: 'deepRose', parts: APPENDIX },
      { label: 'Transverse colon — intraperitoneal', ko: '가로잘록창자', colour: 'gold', parts: TRANSVERSE_COLON },
      { label: 'Descending & sigmoid colon', ko: '내림 · 구불잘록창자', colour: 'sage', parts: DESCENDING_COLON },
      { label: 'Rectum', ko: '곧창자', colour: 'slate', parts: RECTUM },
    ],
    soft: [...SMALL_INTESTINE, ...HIP_BONES, ...SACRUM],
    frame: [...ASCENDING_COLON, ...TRANSVERSE_COLON, ...DESCENDING_COLON, ...RECTUM],
    zoom: 0.95,
  },
  'unpaired-branches': {
    title: 'Three unpaired branches of the abdominal aorta',
    turn: -70,
    spin: false,
    groups: [
      { label: 'Celiac trunk — T12 · foregut', ko: '복강동맥 · T12', colour: 'rose', parts: CELIAC },
      { label: 'Superior mesenteric a. — L1 · midgut', ko: '위창자간막동맥 · L1', colour: 'gold', parts: SMA },
      { label: 'Inferior mesenteric a. — L3 · hindgut', ko: '아래창자간막동맥 · L3', colour: 'sky', parts: IMA },
      { label: 'Abdominal aorta', ko: '배대동맥', colour: 'deepRose', parts: ABDOMINAL_AORTA },
      { label: 'T12 · L1 · L3', ko: '척추', colour: 'ivory', parts: [...T12, ...L1, ...L3] },
    ],
    soft: [...LUMBAR_VERTEBRAE],
    frame: [...ABDOMINAL_AORTA, ...SMA, ...IMA],
    zoom: 0.95,
  },

  'celiac-trunk': {
    title: 'Branches of the celiac trunk',
    turn: 0,
    tilt: 10,
    spin: false,
    groups: [
      { label: 'Celiac trunk', ko: '복강동맥', colour: 'deepRose', parts: CELIAC },
      { label: 'Left gastric a.', ko: '왼위동맥', colour: 'rose', parts: LEFT_GASTRIC_A },
      { label: 'Common → proper hepatic a.', ko: '온간 · 고유간동맥', colour: 'gold', parts: [...COMMON_HEPATIC_A, ...PROPER_HEPATIC_A] },
      { label: 'Right gastric a.', ko: '오른위동맥', colour: 'sage', parts: RIGHT_GASTRIC_A },
      { label: 'Gastroduodenal → sup. pancreaticoduodenal aa.', ko: '위샘창자동맥', colour: 'sky', parts: [...GASTRODUODENAL_A, 'FMA14782', 'FMA14784'] },
      { label: 'Splenic a.', ko: '지라동맥', colour: 'slate', parts: SPLENIC_A },
    ],
    soft: [...STOMACH, ...SPLEEN, ...PANCREAS, ...DUODENUM, ...GALLBLADDER, ...ABDOMINAL_AORTA],
    frame: [...STOMACH, ...SPLEEN, ...DUODENUM],
    zoom: 1.35,
  },

  'sma-branches': {
    title: 'Branches of the superior mesenteric artery',
    turn: 0,
    spin: false,
    groups: [
      { label: 'Superior mesenteric a.', ko: '위창자간막동맥', colour: 'rose', parts: SMA },
      { label: 'Inferior pancreaticoduodenal a.', ko: '아래이자샘창자동맥', colour: 'paleRose', parts: INF_PANCREATICODUODENAL_A },
      { label: 'Middle colic a.', ko: '중간잘록창자동맥', colour: 'gold', parts: MIDDLE_COLIC_A },
      { label: 'Right colic a.', ko: '오른잘록창자동맥', colour: 'sage', parts: RIGHT_COLIC_A },
      { label: 'Ileocolic a.', ko: '돌잘록창자동맥', colour: 'sky', parts: [...ILEOCOLIC_A, ...ILEAL_A] },
      { label: 'Appendicular a.', ko: '막창자꼬리동맥', colour: 'deepSky', parts: APPENDICULAR_A },
    ],
    soft: [...DUODENUM, ...PANCREAS, ...COLON, ...APPENDIX, ...ABDOMINAL_AORTA],
    frame: [...SMA, ...MIDDLE_COLIC_A, ...ILEOCOLIC_A, ...COLON],
    zoom: 1.15,
  },

  'ima-anastomoses': {
    title: 'IMA branches and the colic anastomoses',
    turn: 0,
    spin: false,
    groups: [
      { label: 'Inferior mesenteric a.', ko: '아래창자간막동맥', colour: 'sky', parts: IMA },
      { label: 'Left colic a.', ko: '왼잘록창자동맥', colour: 'sage', parts: LEFT_COLIC_A },
      { label: 'Sigmoid aa.', ko: '구불잘록창자동맥', colour: 'deepSage', parts: SIGMOID_A },
      { label: 'Superior rectal a.', ko: '위곧창자동맥', colour: 'deepSky', parts: SUP_RECTAL_A },
      { label: 'Middle colic a. (from the SMA)', ko: '중간잘록창자동맥', colour: 'rose', parts: MIDDLE_COLIC_A },
      { label: 'Marginal a. (Drummond) — along the colon', ko: '변연동맥', colour: 'gold', parts: MARGINAL_A },
    ],
    soft: [...COLON, ...RECTUM, ...ABDOMINAL_AORTA, ...SMA],
    frame: [...COLON, ...RECTUM],
    zoom: 1.1,
  },

  'portal-tributaries': {
    title: 'Tributaries of the portal vein',
    turn: 0,
    spin: false,
    groups: [
      { label: 'Portal v.', ko: '간문맥', colour: 'deepSky', parts: PORTAL_V },
      { label: 'Superior mesenteric v. and tributaries', ko: '위창자간막정맥', colour: 'sky', parts: [...SMV, ...SMV_TRIBUTARIES] },
      { label: 'Splenic v. (+ left gastro-omental v.)', ko: '지라정맥', colour: 'sage', parts: [...SPLENIC_V, 'FMA15390'] },
      { label: 'Inferior mesenteric v. and tributaries', ko: '아래창자간막정맥', colour: 'gold', parts: [...IMV, ...IMV_TRIBUTARIES] },
      { label: 'Left and right gastric vv.', ko: '왼 · 오른위정맥', colour: 'rose', parts: GASTRIC_VV },
    ],
    soft: [...LIVER_WITHOUT_CAUDATE, ...CAUDATE_LOBE, ...STOMACH, ...SPLEEN, ...PANCREAS, ...COLON, ...RECTUM],
    frame: [...PORTAL_V, ...SPLENIC_V, ...IMV, ...SMV_TRIBUTARIES],
    zoom: 1,
  },

}

// Parts the figures need, with a triangle budget for each.
export const VIEW_PARTS = {}
for (const view of Object.values(VIEWS)) {
  for (const id of view.soft ?? []) VIEW_PARTS[id] ??= 0
  for (const g of view.groups) for (const id of g.parts) VIEW_PARTS[id] = Math.max(VIEW_PARTS[id] ?? 0, g.detail ?? 0)
}
