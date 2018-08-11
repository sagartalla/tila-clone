// NOTE: pass componentStyles relative path which matches to this file.
export const mergeCss = (() => {
  const commonStyles = require('../layout/main/main.styl');

  return (componentStyles) => {
    let componentStylesPath = {};
    let arOverrideCss = {};
    if (true) {
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
