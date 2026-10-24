// Each entry is one quiz card.
// fma: BodyParts3D part ids merged into one model.
// topics: syllabus question keys, e.g. "1.6" = Splanchnology 1, question 6.
// kind: drives the material colour.
// wall: a body-wall muscle; shown only when it is the answer.
// backdrop: parts drawn in soft colour behind the answer (e.g. the heart).
// isolated: no faint surroundings — only the answer and its backdrop.

const HEART = ['FMA7274']
const CORONARY_ARTERIES = ['FMA4685', 'FMA3862nsn', 'FMA3895', 'FMA71670', 'FMA3802', 'FMA3818', 'FMA3840nsn', 'FMA76994', 'FMA71669']
const CARDIAC_VEINS = ['FMA4706', 'FMA4707', 'FMA4713', 'FMA71567', 'FMA76751']

export const STRUCTURES = [
  // Splanchnology 1 — head & neck
  { id: 'nasal-cartilages', name: 'Nasal cartilages', aliases: ['cartilages of nose', 'nasal cartilage'], kind: 'cartilage', fma: ['FMA71704'], topics: ['1.1'] },
  { id: 'inferior-nasal-concha', name: 'Inferior nasal concha', aliases: ['inferior concha', 'inferior turbinate'], kind: 'bone', fma: ['FMA54737'], topics: ['1.1'] },
  { id: 'nasal-bone', name: 'Nasal bone', aliases: [], kind: 'bone', fma: ['FMA53647'], topics: ['1.1'] },
  { id: 'palatine-bone', name: 'Palatine bone', aliases: [], kind: 'bone', fma: ['FMA53655'], topics: ['1.1', '1.4'] },
  { id: 'thyroid-cartilage', name: 'Thyroid cartilage', aliases: [], kind: 'cartilage', fma: ['FMA55099'], topics: ['1.2'] },
  { id: 'hyoid-bone', name: 'Hyoid bone', aliases: ['hyoid'], kind: 'bone', fma: ['FMA52749'], topics: ['1.2', '1.4'] },
  { id: 'mylohyoid', name: 'Mylohyoid', aliases: ['mylohyoid muscle'], kind: 'muscle', fma: ['FMA46321', 'FMA46322'], topics: ['1.4'] },
  { id: 'geniohyoid', name: 'Geniohyoid', aliases: ['geniohyoid muscle'], kind: 'muscle', fma: ['FMA46326', 'FMA46327'], topics: ['1.4'] },
  { id: 'digastric', name: 'Digastric', aliases: ['digastric muscle'], kind: 'muscle', fma: ['FMA46304', 'FMA46306'], topics: ['1.4'] },
  { id: 'mandible', name: 'Mandible', aliases: ['lower jaw'], kind: 'bone', fma: ['FMA52748'], topics: ['1.4'] },
  { id: 'central-incisor', name: 'Central incisor', aliases: ['upper central incisor', 'medial incisor'], kind: 'tooth', isolated: true, fma: ['FMA55681'], topics: ['1.6'] },
  { id: 'lateral-incisor', name: 'Lateral incisor', aliases: ['upper lateral incisor'], kind: 'tooth', isolated: true, fma: ['FMA55680'], topics: ['1.6'] },
  { id: 'canine', name: 'Canine', aliases: ['canine tooth', 'cuspid'], kind: 'tooth', isolated: true, fma: ['FMA55798'], topics: ['1.6'] },
  { id: 'first-premolar', name: 'First premolar', aliases: ['premolar', 'upper first premolar'], kind: 'tooth', isolated: true, fma: ['FMA55689'], topics: ['1.6'] },
  { id: 'first-molar', name: 'First molar', aliases: ['molar', 'upper first molar'], kind: 'tooth', isolated: true, fma: ['FMA55698'], topics: ['1.6'] },

  // Splanchnology 1 — thorax
  { id: 'trachea', name: 'Trachea', aliases: [], kind: 'cartilage', fma: ['FMA7394'], topics: ['1.11', '1.18'] },
  { id: 'bronchus', name: 'Main bronchi', aliases: ['bronchus', 'bronchi', 'main bronchus', 'bronchial tree'], kind: 'cartilage', fma: ['FMA7409'], topics: ['1.18'] },
  { id: 'right-upper-lobe', name: 'Upper lobe of right lung', aliases: ['right upper lobe', 'superior lobe of right lung'], kind: 'lung', fma: ['FMA7333'], topics: ['1.10', '1.18'] },
  { id: 'middle-lobe', name: 'Middle lobe of right lung', aliases: ['middle lobe', 'right middle lobe'], kind: 'lung', fma: ['FMA7383'], topics: ['1.10', '1.18'] },
  { id: 'right-lower-lobe', name: 'Lower lobe of right lung', aliases: ['right lower lobe', 'inferior lobe of right lung'], kind: 'lung', fma: ['FMA7337'], topics: ['1.10', '1.18'] },
  { id: 'left-upper-lobe', name: 'Upper lobe of left lung', aliases: ['left upper lobe', 'superior lobe of left lung'], kind: 'lung', fma: ['FMA7370'], topics: ['1.10', '1.18'] },
  { id: 'left-lower-lobe', name: 'Lower lobe of left lung', aliases: ['left lower lobe', 'inferior lobe of left lung'], kind: 'lung', fma: ['FMA7371'], topics: ['1.10', '1.18'] },
  { id: 'heart', name: 'Heart', aliases: ['wall of heart', 'cor'], kind: 'organ', fma: ['FMA7274'], topics: ['1.10', '1.13', '1.15', '1.17'] },
  { id: 'tricuspid-valve', name: 'Tricuspid valve', aliases: ['right atrioventricular valve'], kind: 'valve', isolated: true, backdrop: HEART, fma: ['FMA7234'], topics: ['1.14'] },
  { id: 'mitral-valve', name: 'Mitral valve', aliases: ['bicuspid valve', 'left atrioventricular valve'], kind: 'valve', isolated: true, backdrop: HEART, fma: ['FMA7235'], topics: ['1.14'] },
  { id: 'pulmonary-valve', name: 'Pulmonary valve', aliases: ['pulmonary semilunar valve'], kind: 'valve', isolated: true, backdrop: HEART, fma: ['FMA7246'], topics: ['1.14'] },
  { id: 'papillary-muscles-rv', name: 'Papillary muscles', aliases: ['papillary muscle', 'papillary muscles of right ventricle'], kind: 'muscle', isolated: true, backdrop: HEART, fma: ['FMA7260', 'FMA7261', 'FMA7262'], topics: ['1.15'] },
  { id: 'right-coronary-artery', name: 'Right coronary artery', aliases: ['rca'], kind: 'artery', isolated: true, backdrop: HEART, fma: ['FMA3802', 'FMA3818', 'FMA3840nsn', 'FMA76994', 'FMA71669'], topics: ['1.16'] },
  { id: 'left-coronary-artery', name: 'Left coronary artery', aliases: ['lca'], kind: 'artery', isolated: true, backdrop: HEART, fma: ['FMA4685', 'FMA3862nsn', 'FMA3895', 'FMA71670'], topics: ['1.16'] },
  { id: 'anterior-interventricular', name: 'Anterior interventricular branch', aliases: ['lad', 'left anterior descending artery', 'anterior interventricular artery', 'anterior descending branch'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA3862nsn'], topics: ['1.16'] },
  { id: 'circumflex', name: 'Circumflex branch', aliases: ['circumflex artery', 'lcx', 'circumflex branch of left coronary artery'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA3895'], topics: ['1.16'] },
  { id: 'right-marginal', name: 'Right marginal branch', aliases: ['marginal branch', 'right marginal artery', 'acute marginal branch', 'marginal branch of right coronary artery'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA3818'], topics: ['1.16'] },
  { id: 'posterior-interventricular', name: 'Posterior interventricular branch', aliases: ['pda', 'posterior descending artery', 'posterior interventricular artery', 'posterior descending branch'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA3840nsn'], topics: ['1.16'] },
  { id: 'posterolateral', name: 'Right posterolateral branch', aliases: ['posterolateral branch', 'right posterolateral artery'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA76994'], topics: ['1.16'] },
  { id: 'septal-branches', name: 'Interventricular septal branches', aliases: ['septal branches', 'septal arteries', 'interventricular septal arteries', 'septal perforators'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA71669', 'FMA71670'], topics: ['1.16'] },
  { id: 'coronary-sinus', name: 'Coronary sinus', aliases: [], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA4706'], topics: ['1.16'] },
  { id: 'great-cardiac-vein', name: 'Great cardiac vein', aliases: ['vena cordis magna'], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA4707'], topics: ['1.16'] },
  { id: 'middle-cardiac-vein', name: 'Middle cardiac vein', aliases: ['posterior interventricular vein', 'vena cordis media'], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA4713'], topics: ['1.16'] },
  { id: 'anterior-cardiac-veins', name: 'Anterior cardiac veins', aliases: ['anterior cardiac vein', 'venae cordis anteriores'], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA71567'], topics: ['1.16'] },
  { id: 'posterior-vein-lv', name: 'Posterior vein of left ventricle', aliases: ['posterior veins of left ventricle', 'posterior left ventricular vein', 'left posterior ventricular vein'], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA76751'], topics: ['1.16'] },
  { id: 'thymus', name: 'Thymus', aliases: [], kind: 'organ', fma: ['FMA71194', 'FMA71195'], topics: ['1.11'] },
  { id: 'aortic-arch', name: 'Arch of aorta', aliases: ['aortic arch'], kind: 'artery', backdrop: HEART, fma: ['FMA3736', 'FMA3768', 'FMA3932nsn', 'FMA4058', 'FMA4694'], topics: ['1.11', '1.19'] },
  { id: 'pulmonary-trunk', name: 'Pulmonary trunk', aliases: ['pulmonary artery', 'pulmonary arteries'], kind: 'artery', backdrop: HEART, fma: ['FMA66326'], topics: ['1.18'] },
  { id: 'pulmonary-veins', name: 'Pulmonary veins', aliases: ['pulmonary vein'], kind: 'vein', backdrop: HEART, fma: ['FMA66643'], topics: ['1.18'] },
  { id: 'superior-vena-cava', name: 'Superior vena cava', aliases: ['svc'], kind: 'vein', backdrop: HEART, fma: ['FMA4720', 'FMA4751', 'FMA4761'], topics: ['1.11', '1.13'] },
  { id: 'esophagus', name: 'Esophagus', aliases: ['oesophagus'], kind: 'organ', fma: ['FMA7131'], topics: ['1.19'] },
  { id: 'descending-aorta', name: 'Descending aorta', aliases: ['thoracic aorta', 'aorta'], kind: 'artery', fma: ['FMA3784'], topics: ['1.19', '2.18'] },
  { id: 'transversus-thoracis', name: 'Transversus thoracis', aliases: ['transverse thoracic muscle'], kind: 'muscle', wall: true, fma: ['FMA9761', 'FMA9762'], topics: ['1.11'] },

  // Splanchnology 2 — abdomen
  { id: 'rectus-abdominis', name: 'Rectus abdominis', aliases: [], kind: 'muscle', wall: true, fma: ['FMA13377', 'FMA13378'], topics: ['2.2'] },
  { id: 'external-oblique', name: 'External oblique', aliases: ['external abdominal oblique', 'obliquus externus abdominis'], kind: 'muscle', wall: true, fma: ['FMA13336'], topics: ['2.2'] },
  { id: 'internal-oblique', name: 'Internal oblique', aliases: ['internal abdominal oblique', 'obliquus internus abdominis'], kind: 'muscle', wall: true, fma: ['FMA13892'], topics: ['2.2'] },
  { id: 'transversus-abdominis', name: 'Transversus abdominis', aliases: ['transverse abdominal muscle'], kind: 'muscle', wall: true, fma: ['FMA22344'], topics: ['2.2'] },
  { id: 'pyramidalis', name: 'Pyramidalis', aliases: [], kind: 'muscle', wall: true, fma: ['FMA22346', 'FMA22347'], topics: ['2.2'] },
  { id: 'stomach', name: 'Stomach', aliases: ['gaster'], kind: 'organ', fma: ['FMA7148'], topics: ['2.1', '2.4'] },
  { id: 'diaphragm', name: 'Diaphragm', aliases: [], kind: 'muscle', fma: ['FMA13295'], topics: ['2.5'] },
  { id: 'liver', name: 'Liver', aliases: ['hepar'], kind: 'organ', fma: ['FMA7197'], topics: ['2.1', '2.7', '2.8'] },
  { id: 'gallbladder', name: 'Gallbladder', aliases: ['gall bladder'], kind: 'organ', fma: ['FMA7202'], topics: ['2.6', '2.8'] },
  { id: 'spleen', name: 'Spleen', aliases: ['lien'], kind: 'organ', fma: ['FMA7196'], topics: ['2.9'] },
  { id: 'duodenum', name: 'Duodenum', aliases: [], kind: 'organ', fma: ['FMA7206'], topics: ['2.10'] },
  { id: 'pancreas', name: 'Pancreas', aliases: [], kind: 'organ', fma: ['FMA7198nsn', 'FMA10419'], topics: ['2.10'] },
  { id: 'jejunum', name: 'Jejunum', aliases: [], kind: 'organ', fma: ['FMA7207'], topics: ['2.11'] },
  { id: 'ileum', name: 'Ileum', aliases: [], kind: 'organ', fma: ['FMA7208'], topics: ['2.11'] },
  { id: 'colon', name: 'Colon', aliases: ['large intestine'], kind: 'organ', fma: ['FMA14543nsn'], topics: ['2.11'] },
  { id: 'appendix', name: 'Appendix', aliases: ['vermiform appendix'], kind: 'organ', fma: ['FMA14542'], topics: ['2.11'] },
  { id: 'celiac-trunk', name: 'Celiac trunk', aliases: ['coeliac trunk', 'celiac artery', 'coeliac artery'], kind: 'artery', fma: ['FMA50737', 'FMA14768', 'FMA14771', 'FMA14773'], topics: ['2.4', '2.12'] },
  { id: 'splenic-artery', name: 'Splenic artery', aliases: ['lienal artery'], kind: 'artery', fma: ['FMA14773'], topics: ['2.9', '2.12'] },
  { id: 'superior-mesenteric-artery', name: 'Superior mesenteric artery', aliases: ['sma'], kind: 'artery', fma: ['FMA14749'], topics: ['2.13'] },
  { id: 'inferior-mesenteric-artery', name: 'Inferior mesenteric artery', aliases: ['ima'], kind: 'artery', fma: ['FMA14750'], topics: ['2.13'] },
  { id: 'splenic-vein', name: 'Splenic vein', aliases: ['lienal vein'], kind: 'vein', fma: ['FMA14331'], topics: ['2.15'] },
  { id: 'superior-mesenteric-vein', name: 'Superior mesenteric vein', aliases: ['smv'], kind: 'vein', fma: ['FMA14332'], topics: ['2.15'] },
  { id: 'kidney', name: 'Kidney', aliases: ['ren', 'right kidney'], kind: 'organ', fma: ['FMA7204'], topics: ['2.16', '2.17'] },
  { id: 'adrenal-gland', name: 'Adrenal gland', aliases: ['suprarenal gland', 'right adrenal gland'], kind: 'organ', fma: ['FMA15629'], topics: ['2.16'] },
  { id: 'renal-arteries', name: 'Renal artery', aliases: ['renal arteries'], kind: 'artery', fma: ['FMA14752', 'FMA14753'], topics: ['2.16', '2.18'] },
  { id: 'renal-veins', name: 'Renal vein', aliases: ['renal veins'], kind: 'vein', fma: ['FMA14335', 'FMA14336'], topics: ['2.18'] },
  { id: 'inferior-vena-cava', name: 'Inferior vena cava', aliases: ['ivc'], kind: 'vein', fma: ['FMA10951'], topics: ['2.18'] },
  { id: 'common-iliac-artery', name: 'Common iliac artery', aliases: ['common iliac arteries'], kind: 'artery', fma: ['FMA14765', 'FMA14766'], topics: ['2.18', '2.21'] },

  // Splanchnology 2 — pelvis
  { id: 'ureter', name: 'Ureter', aliases: ['ureters'], kind: 'organ', fma: ['FMA15571', 'FMA15572'], topics: ['2.19'] },
  { id: 'urinary-bladder', name: 'Urinary bladder', aliases: ['bladder', 'vesica urinaria'], kind: 'organ', fma: ['FMA15900'], topics: ['2.19'] },
  { id: 'rectum', name: 'Rectum', aliases: [], kind: 'organ', fma: ['FMA14544'], topics: ['2.20'] },
  { id: 'external-anal-sphincter', name: 'External anal sphincter', aliases: ['sphincter ani externus'], kind: 'muscle', fma: ['FMA21930'], topics: ['2.20', '2.26'] },
  { id: 'internal-iliac-artery', name: 'Internal iliac artery', aliases: ['hypogastric artery', 'internal iliac arteries'], kind: 'artery', fma: ['FMA18809', 'FMA18810'], topics: ['2.21'] },
  { id: 'internal-iliac-vein', name: 'Internal iliac vein', aliases: ['internal iliac veins'], kind: 'vein', fma: ['FMA18887', 'FMA18888'], topics: ['2.21'] },
  { id: 'prostate', name: 'Prostate', aliases: ['prostate gland'], kind: 'organ', fma: ['FMA9600'], topics: ['2.24'] },
  { id: 'seminal-vesicle', name: 'Seminal vesicle', aliases: ['seminal vesicles', 'seminal gland'], kind: 'organ', fma: ['FMA19387', 'FMA19388'], topics: ['2.24'] },
  { id: 'urethra', name: 'Male urethra', aliases: ['urethra'], kind: 'organ', fma: ['FMA19667'], topics: ['2.24'] },
  { id: 'ductus-deferens', name: 'Ductus deferens', aliases: ['vas deferens', 'deferent duct'], kind: 'organ', fma: ['FMA19235', 'FMA19236'], topics: ['2.25'] },
  { id: 'testis', name: 'Testis', aliases: ['testicle'], kind: 'organ', fma: ['FMA7211'], topics: ['2.25'] },
  { id: 'epididymis', name: 'Epididymis', aliases: [], kind: 'organ', fma: ['FMA18256'], topics: ['2.25'] },
  { id: 'levator-ani', name: 'Levator ani', aliases: ['levator ani muscle'], kind: 'muscle', fma: ['FMA45854', 'FMA45855', 'FMA45858', 'FMA45859', 'FMA46442'], topics: ['2.26'] },
  { id: 'coccygeus', name: 'Coccygeus', aliases: ['ischiococcygeus'], kind: 'muscle', fma: ['FMA46443', 'FMA46444'], topics: ['2.26'] },
  { id: 'hip-bone', name: 'Hip bone', aliases: ['os coxae', 'coxal bone', 'innominate bone', 'pelvic bone'], kind: 'bone', fma: ['FMA16586'], topics: ['2.26'] },
  { id: 'sacrum', name: 'Sacrum', aliases: [], kind: 'bone', fma: ['FMA16202'], topics: ['2.26'] },
  { id: 'penis', name: 'Penis', aliases: [], kind: 'organ', fma: ['FMA19618', 'FMA19617nsn', 'FMA18247'], topics: ['2.27'] },
  { id: 'corpus-cavernosum', name: 'Corpus cavernosum', aliases: ['corpora cavernosa'], kind: 'organ', fma: ['FMA19618'], topics: ['2.27'] },
  { id: 'corpus-spongiosum', name: 'Corpus spongiosum', aliases: [], kind: 'organ', fma: ['FMA19617nsn', 'FMA18247'], topics: ['2.27'] },
]

// Shown only as faint surroundings, never asked.
export const CONTEXT = [
  { kind: 'organ', fma: ['FMA7205', 'FMA15630', 'FMA7212', 'FMA18257'] }, // left kidney, adrenal, testis, epididymis
  { kind: 'artery', fma: ['FMA18806', 'FMA18807', 'FMA3941', 'FMA3953'] }, // external iliac arteries, right carotid & subclavian
  { kind: 'vein', fma: ['FMA18885', 'FMA18886', 'FMA21387', 'FMA21388'] }, // external & common iliac veins
  { kind: 'bone', fma: ['FMA16587', 'FMA7487', 'FMA53648', 'FMA53656', 'FMA54738'] }, // left hip bone, sternum, left nasal/palatine/concha
  {
    kind: 'bone',
    fma: [
      'FMA12521', 'FMA12522', 'FMA12523', 'FMA12524', 'FMA12525', // C3–C7
      'FMA9165', 'FMA9187', 'FMA9209', 'FMA9248', 'FMA9922', 'FMA9945', 'FMA9968', 'FMA9991', 'FMA10014', 'FMA10037', 'FMA10059', 'FMA10081', // T1–T12
      'FMA13072', 'FMA13073', 'FMA13074', 'FMA13075', 'FMA13076', // L1–L5
    ],
  },
  {
    kind: 'tooth',
    fma: [
      'FMA55682', 'FMA55683', 'FMA55799', 'FMA55690', 'FMA55691', 'FMA55699', 'FMA55700', 'FMA55688', 'FMA55697',
      'FMA57140', 'FMA57141', 'FMA57142', 'FMA57143', 'FMA55686', 'FMA55687', 'FMA55692', 'FMA55693', 'FMA55694',
      'FMA55695', 'FMA55703', 'FMA55704', 'FMA55705', 'FMA55706',
    ],
  },
]

// Every part in the scene, with the tissue kind used to tint it.
export const PART_KIND = {}
for (const s of [...CONTEXT, ...STRUCTURES]) for (const id of s.fma) PART_KIND[id] ??= s.kind

// Body-wall muscles wrap everything else, so they are never drawn as surroundings.
export const WALL_PARTS = new Set(STRUCTURES.filter((s) => s.wall).flatMap((s) => s.fma))
