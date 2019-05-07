const eslintFormatter = require('react-dev-utils/eslintFormatter');
const withStylus = require('@zeit/next-stylus');
const withCSS = require('@zeit/next-css');
// const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');
const path = require('path');
const git = require('git-rev-sync');
const webpack = require('webpack');
const withSourceMaps = require('@zeit/next-source-maps');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// require('./deploy/env');
if (process.env.npm_package_config_ENV) {
  process.env.ENV = process.env.npm_package_config_ENV;
}
const version = process.env.version || git.short();

const files = [];

module.exports = withSourceMaps(withStylus(withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  serverRuntimeConfig: {
    isServer: true,
  },
  publicRuntimeConfig: {
    env: process.env.ENV || 'preprod',
    isLocal: process.env.LOCAL === 'true',
    version,
    SENTRY_DSN: 'https://f330056a5bc44dc1bb2561bbd0929d9a@sentry.fptechscience.com/2',
  },
  generateBuildId: async () => version,
  webpack: (config, { dev, isServer, buildId }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    config.optimization = Object.assign({}, config.optimization, {
      splitChunks: Object.assign({}, config.optimization.splitChunks, {
        minSize: 1000,
        cacheGroups: Object.assign({}, config.optimization.splitChunks.cacheGroups, {
          app: {
            name: 'app',
            test: (m, c) => {
              if(files.indexOf(m._identifier) !== -1) {
                return false;
              }
              files.push(m._identifier);
              if(m.constructor.name === 'CssModule') {
                console.log('app', m._identifier);
              }
              return m.constructor.name === 'CssModule';
            },
            priority: 2,
            chunks: 'all',
            enforce: true,
            reuseExistingChunk: true,
          },
        })
      })
    });
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
    }));
    config.plugins.push(new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }));
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-inline-loader',
    });
    // config = commonsChunkConfig(config, /\.(styl|css)$/);
    return config;
  },
})));
