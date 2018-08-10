import getConfig from 'next/config'
const config = getConfig()

export default {
  local: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae--tst1.custhelp.com/'
  },
  dev: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae--tst1.custhelp.com/'
  },
  staging: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae--tst1.custhelp.com/'
  },
  production: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae--tst1.custhelp.com/'
  }
}[config.publicRuntimeConfig.env || 'dev'];
