import Cookies from 'universal-cookie';

const lang = (() => {
  if(global.constructor.name !== 'Window') {
    return global.APP_LANGUAGE || 'en';
  }
  const cookies = new Cookies();
  return cookies.get('language') || 'en';
})();

export default lang;
