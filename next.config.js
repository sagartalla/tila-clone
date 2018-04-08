const eslintFormatter = require('react-dev-utils/eslintFormatter');

module.exports = {
  webpack: (config, { dev }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: eslintFormatter,
          emitWarning: dev
        }
      })
    }
    return config
  }
}
