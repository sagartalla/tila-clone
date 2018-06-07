const readURLParams = (name, url) => {
  try {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
  } catch (e) {

  }
}

export const languageDefinations = (() => {
  let obj = {};
  switch (readURLParams('language')) {
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