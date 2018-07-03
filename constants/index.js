import getConfig from 'next/config'
const config = getConfig()

export default {
  local: {
    mediaDomain: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae--tst1.custhelp.com/'
  },
  dev: {
    mediaDomain: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae--tst1.custhelp.com/'
  },
  staging: {
    mediaDomain: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae--tst1.custhelp.com/'
  },
  production: {
    mediaDomain: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae--tst1.custhelp.com/'
  }
}[config.publicRuntimeConfig.env || 'dev'];
