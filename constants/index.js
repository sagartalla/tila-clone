import getConfig from 'next/config'
const config = getConfig()

export default {
  local: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faq',
    custhelpDomain: 'https://fptsuae.custhelp.com'
  },
  dev: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faq',
    custhelpDomain: 'https://fptsuae.custhelp.com'
  },
  staging: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'http://sellermarket-stage.fptechscience.com/',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faq',
    custhelpDomain: 'https://fptsuae.custhelp.com'
  },
  production: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'http://sellermarket-dev.fptechscience.com/',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faqs',
    custhelpDomain: 'https://fptsuae.custhelp.com'
  },
  preprod: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'http://sellermarket-stage.fptechscience.com/',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faq',
    custhelpDomain: 'https://fptsuae.custhelp.com'
  }
}[config.publicRuntimeConfig.env || 'dev'];
