import getConfig from 'next/config';

const config = getConfig();

export default {
  local: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'https://sellermarket-stage.fptechscience.com/login',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faq',
    custhelpDomain: 'https://fptsuae.custhelp.com',
  },
  dev: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'https://sellermarket-stage.fptechscience.com/login',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faq',
    custhelpDomain: 'https://fptsuae.custhelp.com',
  },
  staging: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'https://sellermarket-stage.fptechscience.com/login',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faq',
    custhelpDomain: 'https://fptsuae.custhelp.com',
  },
  stage: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'https://sellermarket-stage.fptechscience.com/login',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faq',
    custhelpDomain: 'https://fptsuae.custhelp.com',
  },
  production: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'https://seller.afdalalmazaya.com/login',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faqs',
    custhelpDomain: 'https://fptsuae.custhelp.com',
  },
  prod: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'https://seller.afdalalmazaya.com/login',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faqs',
    custhelpDomain: 'https://fptsuae.custhelp.com',
  },
  preprod: {
    mediaDomain: 'https://static-dev.tila.com',
    sellerPlatform: 'https://seller-preprod.afdalalmazaya.com/login',
    customerHelp: 'https://fptsuae.custhelp.com/app/faq/faq',
    custhelpDomain: 'https://fptsuae.custhelp.com',
  }
}[config.publicRuntimeConfig.env || 'preprod'];
