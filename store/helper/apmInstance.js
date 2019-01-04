// // import { init as initApm } from 'elastic-apm-js-base';
// import getConfig from 'next/config';
// // const apmConfig = require('../../apm.config');
//
// const config = getConfig()
// const isServer = config.serverRuntimeConfig.isServer;
// const version = config.publicRuntimeConfig.version;
// const env = config.publicRuntimeConfig.env;
//
// let apm;
// if (env !== 'local'){
//   apm = initApm({
//     serviceName: apmConfig.serviceName,
//     serverUrl: apmConfig.serverUrl,
//     serviceVersion: version,
//   });
// }
//
// export default apm;
