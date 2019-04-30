const eslintFormatter = require('react-dev-utils/eslintFormatter');
const withStylus = require('@zeit/next-stylus');
const withCSS = require('@zeit/next-css');
// const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');
const path = require('path');
const git = require('git-rev-sync');
const webpack = require('webpack')
const withSourceMaps = require('@zeit/next-source-maps')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// require('./deploy/env');
if(process.env.npm_package_config_ENV) {
  process.env.ENV = process.env.npm_package_config_ENV;
}
const version = process.env.version || git.short();
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
      env: process.env.ENV || 'preprod',
      isLocal: process.env.LOCAL === 'true',
      version: version,
      SENTRY_DSN: 'https://f330056a5bc44dc1bb2561bbd0929d9a@sentry.fptechscience.com/2'
  },
  generateBuildId: async () => {
    return version;
  },
  webpack: (config, { dev, isServer, buildId }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    // config.plugins = [
    //   new BundleAnalyzerPlugin()
    // ]
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
    // config.resolve = Object.assign(config.resolve, {
    //   extensions: ['.js', '.json', '.svg', '.css'],
    //   modules: [
    //     path.resolve('./'),
    //     path.resolve('./node_modules')
    //   ]
    // });
    // config.optimization = Object.assign({}, config.optimization, {
    //   splitChunks: Object.assign({}, config.optimization.splitChunks, {
    //     cacheGroups: Object.assign({}, config.optimization.splitChunks.cacheGroups, {
    //       englishStyle: {
    //         name: 'styles_en',
    //         test: (m, c) => {
    //           return m.constructor.name === 'CssModule' && m._identifier.indexOf('_ar') === -1;
    //         },
    //         chunks: 'all',
    //         priority: 2,
    //         // enforce: true,
    //       },
    //       arabicStyles: {
    //         name: 'styles_ar',
    //         test: (m, c) => {
    //           return m.constructor.name === 'CssModule' && m._identifier.indexOf('_ar') !== -1;
    //         },
    //         priority: 1,
    //         chunks: 'all',
    //         // enforce: true,
    //       }
    //     })
    //   })
    // });
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(buildId)
      })
    );
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    );
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-inline-loader'
    });
    // config = commonsChunkConfig(config, /\.(styl|css)$/);
    return config
  }
})));
