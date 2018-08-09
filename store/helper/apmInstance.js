import { init as initApm } from 'elastic-apm-js-base';
import getConfig from 'next/config';
const apmConfig = require('../../apm.config');

const config = getConfig()
const env = config.publicRuntimeConfig.env;

let apm;
// if (env !== 'local'){
apm = initApm({
  serviceName: apmConfig.serviceName,
  serverUrl: apmConfig.serverUrl,
});
// }


export default apm;
