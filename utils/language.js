import Cookies from 'universal-cookie';

const lang = (() => {
  if(global.constructor.name !== 'Window') {
    return global.APP_LANGUAGE || 'ar';
  }
  const cookies = new Cookies();
  return cookies.get('language') || 'ar';
})();

export default lang;
