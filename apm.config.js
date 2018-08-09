var getConfig = require('next/config');
var config = getConfig.default();

var env = config || '';
env = env.publicRuntimeConfig || '';
env = env.env || '';

env = env || process.env.ENV;

module.exports = {
  local: {
    serviceName: 'store-front-local',
    serverUrl: 'http://apm.fptechscience.com',
    env: 'local'
  },
  dev: {
    serviceName: 'store-front-dev',
    serverUrl: 'http://apm.fptechscience.com',
    env: 'dev'
  },
  staging: {
    serviceName: 'store-front-stage',
    serverUrl: 'http://apm.fptechscience.com',
    env: 'stage'
  },
  production: {
    serviceName: 'store-front-prod',
    serverUrl: 'http://apm.fptechscience.com',
    env: 'prod',
  }
}[ env || 'dev' ];
