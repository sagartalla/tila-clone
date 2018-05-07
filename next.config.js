const eslintFormatter = require('react-dev-utils/eslintFormatter');
const withStylus = require('@zeit/next-stylus');
const withCSS = require('@zeit/next-css');
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');
const path = require('path');

module.exports = withStylus(withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
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
      });
    }
    // config.resolve = {
    //   extensions: ['', '.js'],
    //     root: [
    //       path.resolve('./')
    //     ]
    // }
    config = commonsChunkConfig(config, /\.(styl|css)$/);
    return config
  }
}));
