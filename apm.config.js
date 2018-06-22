import getConfig from 'next/config'
const config = getConfig()
export default {
  local: {
    serviceName: 'store-front',
    serverUrl: 'http://localhost:8200',
    env: 'local'
  },
  dev: {
    serviceName: 'store-front',
    serverUrl: 'http://apm.fptechscience.com/',
    env: 'dev'
  },
  staging: {
    serviceName: 'store-front',
    serverUrl: 'http://apm.fptechscience.com/',
    env: 'stage'
  },
  production: {
    serviceName: 'store-front',
    serverUrl: 'http://apm.fptechscience.com/',
    env: 'prod',
  }
}[config.publicRuntimeConfig.env || 'dev'];
