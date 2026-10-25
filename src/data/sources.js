// Where each part's mesh comes from, used only by scripts/build-models.mjs.
//
// Parts are named by FMA id. The build takes the BodyParts3D 4.0 meshes whose
// concept is that id; when 4.0 has none it falls back to the 3.0 STL of the
// same id (e.g. the lung lobes, which 4.0's IS-A set lacks).
//
// ALIASES covers ids that 4.0 splits into several meshes under other ids.

export const ALIASES = {
  FMA71704: ['FMA59512', 'FMA59513', 'FMA59503', 'FMA59505', 'FMA59506'], // nasal cartilages: lateral, septal, major alar
  FMA7409: ['FMA7396', 'FMA68418'], // main bronchi: left, right proper
  FMA7274: ['FMA9457', 'FMA9531', 'FMA13884'], // wall of heart: right atrium, left atrium, ventricles
  FMA7234: ['FMA7238', 'FMA7239', 'FMA7240'], // tricuspid valve: anterior, posterior, septal leaflets
  FMA7235: ['FMA7242', 'FMA7243'], // mitral valve: anterior, posterior leaflets
  FMA7246: ['FMA7247', 'FMA7249', 'FMA7250'], // pulmonary valve: three cusps
  FMA4685: ['FMA3855'], // stem of left coronary artery
  FMA3862nsn: ['FMA74912', 'FMA3860', 'FMA3868', 'FMA3872', 'FMA3874', 'FMA3876'], // anterior interventricular branch and its branches
  FMA71670: ['FMA3892'], // septal branches of the anterior interventricular artery
  FMA71669: ['FMA3847', 'FMA3848'], // septal branches of the posterior interventricular artery
  FMA71567: ['FMA76767'], // anterior cardiac vein
  FMA76751: ['FMA4712'], // posterior vein of left ventricle
  FMA66326: ['FMA8612', 'FMA50872', 'FMA50873'], // pulmonary trunk, right and left pulmonary arteries
  FMA66643: ['FMA49911', 'FMA49913', 'FMA49914', 'FMA49916'], // four pulmonary veins
  FMA7197: ['FMA13365', 'FMA15739', 'FMA15741', 'FMA15742', 'FMA15743', 'FMA15744', 'FMA15745', 'FMA15746', 'FMA15747'], // liver: caudate lobe + segments II–IX
  FMA7207: ['FMA16981', 'FMA16982', 'FMA16983'], // jejunum: proximal, middle, distal
  FMA7208: ['FMA14964', 'FMA14965', 'FMA14966'], // ileum: proximal, middle, distal
  FMA14543nsn: ['FMA14545', 'FMA14546', 'FMA14547'], // colon: ascending, transverse, descending
}
