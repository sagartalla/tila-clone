const eslintFormatter = require('react-dev-utils/eslintFormatter');
const withStylus = require('@zeit/next-stylus');
const withCSS = require('@zeit/next-css');
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');
const path = require('path');
const git = require('git-rev-sync');
const withSourceMaps = require('@zeit/next-source-maps')
const version = git.short();
module.exports = withSourceMaps(withStylus(withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  serverRuntimeConfig: {
    isServer: true
  },
  publicRuntimeConfig: {
      env: process.env.ENV,
      version: version
  },
  generateBuildId: async () => {
    return version;
  },
  webpack: (config, { dev }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    // if(!dev) {
    //   config.devtool = 'source-map'
    // }
    // if (dev) {
    //   config.module.rules.push({
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint-loader',
    //     options: {
    //       formatter: eslintFormatter,
    //       emitWarning: dev
    //     }
    //   });
    // }
    config.resolve = {
      extensions: ['.js', '.json', '.svg', '.css'],
      modules: [
        path.resolve('./'),
        path.resolve('./node_modules')
      ]
    }
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-inline-loader'
    });
    config = commonsChunkConfig(config, /\.(styl|css)$/);
    return config
  }
})));
