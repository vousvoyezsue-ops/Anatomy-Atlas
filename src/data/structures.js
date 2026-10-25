// Each entry is one quiz card.
// fma: BodyParts3D part ids merged into one model.
// topics: syllabus question keys, e.g. "1.6" = Splanchnology 1, question 6.
// kind: drives the material colour.
// wall: a body-wall muscle; shown only when it is the answer.
// backdrop: parts drawn in soft colour behind the answer (e.g. the heart).
// isolated: no faint surroundings — only the answer and its backdrop.

const HEART = ['FMA7274']
const CORONARY_ARTERIES = ['FMA4685', 'FMA3862nsn', 'FMA3895', 'FMA71670', 'FMA3802', 'FMA3807', 'FMA3815', 'FMA3818', 'FMA3837', 'FMA3840nsn', 'FMA71669']
const LARYNX = ['FMA55099', 'FMA9615', 'FMA55113', 'FMA55114', 'FMA55130', 'FMA55115', 'FMA55116', 'FMA55117', 'FMA55118', 'FMA52749']
const PHARYNX_MUSCLES = [
  'FMA46631', 'FMA46632', 'FMA46633', 'FMA46634', 'FMA46635', 'FMA46636', // superior, middle, inferior constrictors
  'FMA46667', 'FMA46668', 'FMA46669', 'FMA46670', 'FMA46671', 'FMA46672', // stylo-, salpingo-, palatopharyngeus
]
const CARDIAC_VEINS = ['FMA4706', 'FMA4707', 'FMA4713', 'FMA4714', 'FMA4716', 'FMA71567', 'FMA76751']

export const STRUCTURES = [
  // Splanchnology 1 — head & neck
  { id: 'nasal-cartilages', name: 'Nasal cartilages', aliases: ['cartilages of nose', 'nasal cartilage'], kind: 'cartilage', fma: ['FMA71704'], topics: ['1.1'] },
  { id: 'inferior-nasal-concha', name: 'Inferior nasal concha', aliases: ['inferior concha', 'inferior turbinate'], kind: 'bone', fma: ['FMA54737'], topics: ['1.1'] },
  { id: 'nasal-bone', name: 'Nasal bone', aliases: [], kind: 'bone', fma: ['FMA53647'], topics: ['1.1'] },
  { id: 'palatine-bone', name: 'Palatine bone', aliases: [], kind: 'bone', fma: ['FMA53655'], topics: ['1.1', '1.4'] },
  { id: 'thyroid-cartilage', name: 'Thyroid cartilage', aliases: [], kind: 'cartilage', fma: ['FMA55099'], topics: ['1.2'] },
  { id: 'hyoid-bone', name: 'Hyoid bone', aliases: ['hyoid'], kind: 'bone', fma: ['FMA52749'], topics: ['1.2', '1.4'] },
  { id: 'cricoid-cartilage', name: 'Cricoid cartilage', aliases: ['cricoid'], kind: 'cartilage', isolated: true, backdrop: LARYNX, fma: ['FMA9615'], topics: ['1.2'] },
  { id: 'arytenoid-cartilages', name: 'Arytenoid cartilage', aliases: ['arytenoid cartilages', 'arytenoid', 'arytenoids'], kind: 'cartilage', isolated: true, backdrop: LARYNX, fma: ['FMA55113', 'FMA55114'], topics: ['1.2'] },
  { id: 'epiglottis', name: 'Epiglottis', aliases: ['epiglottic cartilage'], kind: 'cartilage', isolated: true, backdrop: LARYNX, fma: ['FMA55130'], topics: ['1.2'] },
  { id: 'corniculate-cartilages', name: 'Corniculate cartilage', aliases: ['corniculate cartilages', 'cartilage of santorini'], kind: 'cartilage', isolated: true, backdrop: LARYNX, fma: ['FMA55115', 'FMA55116'], topics: ['1.2'] },
  { id: 'cuneiform-cartilages', name: 'Cuneiform cartilage', aliases: ['cuneiform cartilages', 'cartilage of wrisberg'], kind: 'cartilage', isolated: true, backdrop: LARYNX, fma: ['FMA55117', 'FMA55118'], topics: ['1.2'] },
  { id: 'cricothyroid-ligament', name: 'Median cricothyroid ligament', aliases: ['cricothyroid ligament', 'conus elasticus', 'cricothyroid membrane'], kind: 'cartilage', isolated: true, backdrop: LARYNX, fma: ['FMA55237'], topics: ['1.2'] },
  { id: 'cricothyroid', name: 'Cricothyroid', aliases: ['cricothyroid muscle'], kind: 'muscle', isolated: true, backdrop: LARYNX, fma: ['FMA46611', 'FMA46612', 'FMA46613', 'FMA46614'], topics: ['1.3'] },
  { id: 'posterior-cricoarytenoid', name: 'Posterior crico-arytenoid', aliases: ['posterior cricoarytenoid', 'posticus', 'pca'], kind: 'muscle', isolated: true, backdrop: LARYNX, fma: ['FMA46577', 'FMA46578'], topics: ['1.3'] },
  { id: 'lateral-cricoarytenoid', name: 'Lateral crico-arytenoid', aliases: ['lateral cricoarytenoid', 'lca muscle'], kind: 'muscle', isolated: true, backdrop: LARYNX, fma: ['FMA46580', 'FMA46581'], topics: ['1.3'] },
  { id: 'transverse-arytenoid', name: 'Transverse arytenoid', aliases: ['transverse arytenoid muscle', 'arytenoideus transversus'], kind: 'muscle', isolated: true, backdrop: LARYNX, fma: ['FMA46582'], topics: ['1.3'] },
  { id: 'oblique-arytenoid', name: 'Oblique arytenoid', aliases: ['oblique arytenoid muscle', 'arytenoideus obliquus'], kind: 'muscle', isolated: true, backdrop: LARYNX, fma: ['FMA46584', 'FMA46585'], topics: ['1.3'] },
  { id: 'thyroarytenoid', name: 'Thyro-arytenoid', aliases: ['thyroarytenoid', 'thyroarytenoid muscle'], kind: 'muscle', isolated: true, backdrop: LARYNX, fma: ['FMA46589', 'FMA46590'], topics: ['1.3'] },
  { id: 'vocalis', name: 'Vocalis', aliases: ['vocalis muscle', 'vocal muscle'], kind: 'muscle', isolated: true, backdrop: LARYNX, fma: ['FMA46592', 'FMA46593'], topics: ['1.3'] },
  { id: 'aryepiglotticus', name: 'Aryepiglotticus', aliases: ['aryepiglottic muscle'], kind: 'muscle', isolated: true, backdrop: LARYNX, fma: ['FMA46604', 'FMA46605'], topics: ['1.3'] },
  { id: 'tongue', name: 'Tongue', aliases: ['lingua'], kind: 'muscle', fma: ['FMA54640'], topics: ['1.5'] },
  { id: 'genioglossus', name: 'Genioglossus', aliases: ['genioglossus muscle'], kind: 'muscle', fma: ['FMA46698', 'FMA46702'], topics: ['1.5'] },
  { id: 'hyoglossus', name: 'Hyoglossus', aliases: ['hyoglossus muscle'], kind: 'muscle', fma: ['FMA46703', 'FMA46704'], topics: ['1.5'] },
  { id: 'levator-veli-palatini', name: 'Levator veli palatini', aliases: ['levator palati', 'levator veli palatini muscle'], kind: 'muscle', fma: ['FMA46728', 'FMA46729'], topics: ['1.4'] },
  { id: 'tensor-veli-palatini', name: 'Tensor veli palatini', aliases: ['tensor palati', 'tensor veli palatini muscle'], kind: 'muscle', fma: ['FMA46731', 'FMA46732'], topics: ['1.4'] },
  { id: 'musculus-uvulae', name: 'Musculus uvulae', aliases: ['uvular muscle', 'muscle of uvula'], kind: 'muscle', fma: ['FMA46733'], topics: ['1.4'] },
  { id: 'superior-constrictor', name: 'Superior pharyngeal constrictor', aliases: ['superior constrictor'], kind: 'muscle', isolated: true, backdrop: [...PHARYNX_MUSCLES, ...LARYNX], fma: ['FMA46631', 'FMA46632'], topics: ['1.8', '1.9'] },
  { id: 'middle-constrictor', name: 'Middle pharyngeal constrictor', aliases: ['middle constrictor'], kind: 'muscle', isolated: true, backdrop: [...PHARYNX_MUSCLES, ...LARYNX], fma: ['FMA46633', 'FMA46634'], topics: ['1.8', '1.9'] },
  { id: 'inferior-constrictor', name: 'Inferior pharyngeal constrictor', aliases: ['inferior constrictor'], kind: 'muscle', isolated: true, backdrop: [...PHARYNX_MUSCLES, ...LARYNX], fma: ['FMA46635', 'FMA46636'], topics: ['1.8', '1.9'] },
  { id: 'stylopharyngeus', name: 'Stylopharyngeus', aliases: ['stylopharyngeus muscle'], kind: 'muscle', isolated: true, backdrop: [...PHARYNX_MUSCLES, ...LARYNX], fma: ['FMA46667', 'FMA46668'], topics: ['1.9'] },
  { id: 'salpingopharyngeus', name: 'Salpingopharyngeus', aliases: ['salpingopharyngeus muscle'], kind: 'muscle', isolated: true, backdrop: [...PHARYNX_MUSCLES, ...LARYNX], fma: ['FMA46669', 'FMA46670'], topics: ['1.9'] },
  { id: 'palatopharyngeus', name: 'Palatopharyngeus', aliases: ['palatopharyngeus muscle', 'pharyngopalatinus'], kind: 'muscle', isolated: true, backdrop: [...PHARYNX_MUSCLES, ...LARYNX], fma: ['FMA46671', 'FMA46672'], topics: ['1.9'] },
  { id: 'pharyngeal-raphe', name: 'Pharyngeal raphe', aliases: ['raphe of pharynx'], kind: 'cartilage', isolated: true, backdrop: [...PHARYNX_MUSCLES, ...LARYNX], fma: ['FMA55077'], topics: ['1.9'] },
  { id: 'mylohyoid', name: 'Mylohyoid', aliases: ['mylohyoid muscle'], kind: 'muscle', fma: ['FMA46321', 'FMA46322'], topics: ['1.4'] },
  { id: 'geniohyoid', name: 'Geniohyoid', aliases: ['geniohyoid muscle'], kind: 'muscle', fma: ['FMA46326', 'FMA46327'], topics: ['1.4'] },
  { id: 'digastric', name: 'Digastric', aliases: ['digastric muscle'], kind: 'muscle', fma: ['FMA46292', 'FMA46293'], topics: ['1.4'] },
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
  { id: 'right-atrium', name: 'Right atrium', aliases: ['atrium dextrum', 'wall of right atrium'], kind: 'organ', isolated: true, backdrop: HEART, fma: ['FMA9457'], topics: ['1.13'] },
  { id: 'left-atrium', name: 'Left atrium', aliases: ['atrium sinistrum', 'wall of left atrium'], kind: 'organ', isolated: true, backdrop: HEART, fma: ['FMA9531'], topics: ['1.13'] },
  { id: 'right-ventricle', name: 'Right ventricle', aliases: ['ventriculus dexter', 'cavity of right ventricle'], kind: 'organ', isolated: true, backdrop: HEART, fma: ['FMA9291'], topics: ['1.15'] },
  { id: 'left-ventricle', name: 'Left ventricle', aliases: ['ventriculus sinister', 'cavity of left ventricle'], kind: 'organ', isolated: true, backdrop: HEART, fma: ['FMA9466'], topics: ['1.15'] },
  { id: 'tricuspid-valve', name: 'Tricuspid valve', aliases: ['right atrioventricular valve'], kind: 'valve', isolated: true, backdrop: HEART, fma: ['FMA7234'], topics: ['1.14'] },
  { id: 'mitral-valve', name: 'Mitral valve', aliases: ['bicuspid valve', 'left atrioventricular valve'], kind: 'valve', isolated: true, backdrop: HEART, fma: ['FMA7235'], topics: ['1.14'] },
  { id: 'pulmonary-valve', name: 'Pulmonary valve', aliases: ['pulmonary semilunar valve'], kind: 'valve', isolated: true, backdrop: HEART, fma: ['FMA7246'], topics: ['1.14'] },
  { id: 'papillary-muscles-rv', name: 'Papillary muscles', aliases: ['papillary muscle', 'papillary muscles of right ventricle'], kind: 'muscle', isolated: true, backdrop: HEART, fma: ['FMA7260', 'FMA7261', 'FMA7262'], topics: ['1.15'] },
  { id: 'right-coronary-artery', name: 'Right coronary artery', aliases: ['rca'], kind: 'artery', isolated: true, backdrop: HEART, fma: ['FMA3802', 'FMA3807', 'FMA3815', 'FMA3818', 'FMA3837', 'FMA3840nsn', 'FMA71669'], topics: ['1.16'] },
  { id: 'left-coronary-artery', name: 'Left coronary artery', aliases: ['lca'], kind: 'artery', isolated: true, backdrop: HEART, fma: ['FMA4685', 'FMA3862nsn', 'FMA3895', 'FMA71670'], topics: ['1.16'] },
  { id: 'anterior-interventricular', name: 'Anterior interventricular branch', aliases: ['lad', 'left anterior descending artery', 'anterior interventricular artery', 'anterior descending branch'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA3862nsn'], topics: ['1.16'] },
  { id: 'circumflex', name: 'Circumflex branch', aliases: ['circumflex artery', 'lcx', 'circumflex branch of left coronary artery'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA3895'], topics: ['1.16'] },
  { id: 'right-marginal', name: 'Right marginal branch', aliases: ['marginal branch', 'right marginal artery', 'acute marginal branch', 'marginal branch of right coronary artery'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA3818'], topics: ['1.16'] },
  { id: 'posterior-interventricular', name: 'Posterior interventricular branch', aliases: ['pda', 'posterior descending artery', 'posterior interventricular artery', 'posterior descending branch'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA3840nsn'], topics: ['1.16'] },
  { id: 'conus-branch', name: 'Conus branch', aliases: ['right conus artery', 'conus artery', 'conus branch of right coronary artery', 'conal branch'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA3807'], topics: ['1.16'] },
  { id: 'septal-branches', name: 'Interventricular septal branches', aliases: ['septal branches', 'septal arteries', 'interventricular septal arteries', 'septal perforators'], kind: 'artery', isolated: true, backdrop: [...HEART, ...CORONARY_ARTERIES], fma: ['FMA71669', 'FMA71670'], topics: ['1.16'] },
  { id: 'coronary-sinus', name: 'Coronary sinus', aliases: [], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA4706'], topics: ['1.16'] },
  { id: 'great-cardiac-vein', name: 'Great cardiac vein', aliases: ['vena cordis magna'], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA4707'], topics: ['1.16'] },
  { id: 'middle-cardiac-vein', name: 'Middle cardiac vein', aliases: ['posterior interventricular vein', 'vena cordis media'], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA4713'], topics: ['1.16'] },
  { id: 'anterior-cardiac-veins', name: 'Anterior cardiac veins', aliases: ['anterior cardiac vein', 'venae cordis anteriores'], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA71567'], topics: ['1.16'] },
  { id: 'small-cardiac-vein', name: 'Small cardiac vein', aliases: ['vena cordis parva', 'right coronary vein'], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA4714'], topics: ['1.16'] },
  { id: 'posterior-vein-lv', name: 'Posterior vein of left ventricle', aliases: ['posterior veins of left ventricle', 'posterior left ventricular vein', 'left posterior ventricular vein'], kind: 'vein', isolated: true, backdrop: [...HEART, ...CARDIAC_VEINS], fma: ['FMA76751'], topics: ['1.16'] },
  { id: 'thymus', name: 'Thymus', aliases: [], kind: 'organ', fma: ['FMA71194', 'FMA71195'], topics: ['1.11'] },
  { id: 'aortic-arch', name: 'Arch of aorta', aliases: ['aortic arch'], kind: 'artery', backdrop: HEART, fma: ['FMA3736', 'FMA3768', 'FMA3932nsn', 'FMA4058', 'FMA4694'], topics: ['1.11', '1.19'] },
  { id: 'pulmonary-trunk', name: 'Pulmonary trunk', aliases: ['pulmonary artery', 'pulmonary arteries'], kind: 'artery', backdrop: HEART, fma: ['FMA66326'], topics: ['1.18'] },
  { id: 'pulmonary-veins', name: 'Pulmonary veins', aliases: ['pulmonary vein'], kind: 'vein', backdrop: HEART, fma: ['FMA66643'], topics: ['1.18'] },
  { id: 'superior-vena-cava', name: 'Superior vena cava', aliases: ['svc'], kind: 'vein', backdrop: HEART, fma: ['FMA4720', 'FMA4751', 'FMA4761'], topics: ['1.11', '1.13'] },
  { id: 'esophagus', name: 'Esophagus', aliases: ['oesophagus'], kind: 'organ', fma: ['FMA7131'], topics: ['1.19'] },
  { id: 'descending-aorta', name: 'Descending aorta', aliases: ['thoracic aorta', 'aorta'], kind: 'artery', fma: ['FMA3784'], topics: ['1.19', '2.18'] },
  { id: 'internal-thoracic-artery', name: 'Internal thoracic artery', aliases: ['internal mammary artery', 'ita', 'internal thoracic arteries'], kind: 'artery', fma: ['FMA3969', 'FMA4068'], topics: ['1.11'] },
  { id: 'azygos-vein', name: 'Azygos vein', aliases: ['azygos', 'vena azygos'], kind: 'vein', fma: ['FMA4838'], topics: ['1.19'] },
  { id: 'hemiazygos-vein', name: 'Hemiazygos vein', aliases: ['hemiazygos', 'vena hemiazygos'], kind: 'vein', fma: ['FMA4944'], topics: ['1.19'] },
  { id: 'accessory-hemiazygos-vein', name: 'Accessory hemiazygos vein', aliases: ['accessory hemiazygos'], kind: 'vein', fma: ['FMA5011'], topics: ['1.19'] },
  { id: 'posterior-intercostal-arteries', name: 'Posterior intercostal arteries', aliases: ['posterior intercostal artery', 'intercostal arteries'], kind: 'artery', fma: ['FMA63822'], topics: ['1.11', '1.19'] },
  { id: 'vagus-nerve', name: 'Vagus nerve', aliases: ['vagus', 'vagus nerves', 'cn x', 'tenth cranial nerve', 'nervus vagus'], kind: 'nerve', fma: ['FMA18151', 'FMA18157'], topics: ['1.19'] },
  { id: 'recurrent-laryngeal-nerve', name: 'Recurrent laryngeal nerve', aliases: ['recurrent laryngeal nerves', 'recurrent laryngeal', 'inferior laryngeal nerve'], kind: 'nerve', fma: ['FMA80694', 'FMA80695'], topics: ['1.3', '1.19'] },
  { id: 'phrenic-nerve', name: 'Phrenic nerve', aliases: ['left phrenic nerve', 'phrenic'], kind: 'nerve', fma: ['FMA65387', 'FMA6201'], topics: ['1.11', '2.5'] },
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
  { id: 'caudate-lobe', name: 'Caudate lobe', aliases: ['caudate lobe of liver', 'segment i'], kind: 'organ', backdrop: ['FMA7197'], fma: ['FMA13365'], topics: ['2.8'] },
  { id: 'ascending-colon', name: 'Ascending colon', aliases: ['colon ascendens'], kind: 'organ', fma: ['FMA14545'], topics: ['2.11'] },
  { id: 'transverse-colon', name: 'Transverse colon', aliases: ['colon transversum'], kind: 'organ', fma: ['FMA14546'], topics: ['2.11'] },
  { id: 'descending-colon', name: 'Descending colon', aliases: ['colon descendens'], kind: 'organ', fma: ['FMA14547'], topics: ['2.11'] },
  { id: 'left-gastric-artery', name: 'Left gastric artery', aliases: ['arteria gastrica sinistra'], kind: 'artery', fma: ['FMA14768'], topics: ['2.4', '2.12'] },
  { id: 'right-gastric-artery', name: 'Right gastric artery', aliases: ['arteria gastrica dextra'], kind: 'artery', fma: ['FMA14776'], topics: ['2.4', '2.12'] },
  { id: 'common-hepatic-artery', name: 'Common hepatic artery', aliases: ['hepatic artery'], kind: 'artery', fma: ['FMA14771'], topics: ['2.6', '2.12'] },
  { id: 'portal-vein', name: 'Hepatic portal vein', aliases: ['portal vein', 'vena portae'], kind: 'vein', fma: ['FMA50735'], topics: ['2.6', '2.15'] },
  { id: 'inferior-mesenteric-vein', name: 'Inferior mesenteric vein', aliases: ['imv'], kind: 'vein', fma: ['FMA15391'], topics: ['2.15'] },
  { id: 'left-gastric-vein', name: 'Left gastric vein', aliases: ['coronary vein of stomach', 'gastric coronary vein'], kind: 'vein', fma: ['FMA15399'], topics: ['2.15'] },
  { id: 'ascending-lumbar-veins', name: 'Ascending lumbar vein', aliases: ['ascending lumbar veins'], kind: 'vein', fma: ['FMA4843', 'FMA4950'], topics: ['2.18', '1.19'] },
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
  { kind: 'vein', fma: ['FMA4716'] }, // right marginal vein, behind the cardiac-vein cards
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
