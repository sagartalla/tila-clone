// NOTE: pass componentStyles relative path which matches to this file.
export const mergeCss = (() => {
  const commonStyles = require('../layout/main/main.styl');

  return (componentStyles) => {
    const componentStylesPath = require(`../${componentStyles}.styl`);
    return {
      ...commonStyles,
      ...componentStylesPath
    }
  }
})()

export { };