import lang from '../language';
export const languageDefinations = (() => {
  let obj = {};
  switch (lang) {
    case 'ar':
      const ar = require('./ar');
      obj = ar.AR_KEYWORDS;
      break;
    default:
      const en = require('./en');
      obj = en.EN_KEYWORDS;
  }

  return () => {
    return obj;
  }
})();

export { };
