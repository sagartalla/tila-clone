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
  if (readURLParams('language') == 'ar') {
    const val = require('./ar');
    obj = val.AR_KEYWORDS;
  }
  else {
    const val = require('./en');
    obj = val.EN_KEYWORDS;
  }

  return () => {
    return obj;
  }
})();

export { };