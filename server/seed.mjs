import { localizedCv, siteCopy } from '../src/data/cv.ts';
import { copySchema, validateDocument } from '../src/cms/schema.ts';

import { withBuiltInThemes } from '../src/cms/themes.ts';
export { copySchema };
export const seed = withBuiltInThemes({
  localizedCv, siteCopy,
  settings: {
    portraitUrl: '/profile/portrait.jpg', brandMark: 'FR',
    cvDownloadName: 'CV-Farhan-Reninda-Budiansyah.pdf', faviconUrl: '/favicon.svg', themeColor: '#0f172a',
  },
  themes: [{ id: 'existing', name: 'Tema portfolio existing', light: {}, dark: {} }],
  activeThemeId: 'existing',
});
const errors = validateDocument(seed, copySchema);
if (errors.length) throw new Error(`Seed tidak valid: ${errors.join('; ')}`);
