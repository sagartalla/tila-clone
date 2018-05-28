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
    serverUrl: 'http://apm-dev.fptechscience.com',
    env: 'dev'
  },
  staging: {
    serviceName: 'store-front',
    serverUrl: 'http://apm-dev.fptechscience.com',
    env: 'stage'
  },
  production: {
    serviceName: 'store-f;ont',
    serverUrl: 'http://apm-dev.fptechscience.com',
    env: 'prod',
  }
}[config.publicRuntimeConfig.env || 'dev'];