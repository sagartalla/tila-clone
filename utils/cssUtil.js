// NOTE: pass componentStyles relative path which matches to this file.

import Cookie from 'universal-cookie';
import languageData from '../constants/languages';

const cookies = new Cookie();

export const mergeCss = (() => {
  const commonStyles = require('../layout/main/main.styl');

  return (componentStyles) => {
    let componentStylesPath = {};
    let arOverrideCss = {};
    if (languageData[cookies.get('language') || global.APP_LANGUAGE || 'en'].id === 'ar') {
      try {
        componentStylesPath = componentStyles ? require(`../${componentStyles}_ar.styl`) : {};
      } catch (e) {
        componentStylesPath = componentStyles ? require(`../${componentStyles}.styl`) : {};
      }
      arOverrideCss = require('../layout/main/arOverride.styl');
    } else {
      componentStylesPath = componentStyles ? require(`../${componentStyles}.styl`) : {};
    }

    return {
      ...commonStyles,
      ...componentStylesPath,
      ...arOverrideCss
    }
  }
})()

export { };
