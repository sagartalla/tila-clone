// NOTE: pass componentStyles relative path which matches to this file.

import Cookie from 'universal-cookie';

const cookies = new Cookie();

export const mergeCss = (() => {
  const commonStyles = require('../layout/main/main.styl');

  return (componentStyles) => {
    let componentStylesPath = {};
    let arOverrideCss = {};
    componentStylesPath = componentStyles ? require(`../${componentStyles}.styl`) : {};
    return {
      ...commonStyles,
      ...componentStylesPath,
      ...arOverrideCss
    }
  }
})()

export { };
