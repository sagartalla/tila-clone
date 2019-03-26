const getConfig = require('next/config');

const config = getConfig.default();

let env = config || '';
env = env.publicRuntimeConfig || '';
env = env.env || '';

env = env || process.env.ENV;
env = env.trim();

const a = {
  local: {
    IMAGE_SEARCH_URL: 'http://192.168.0.180:9090/image-search',
    SEARCH_API_URL: 'http://192.168.0.180:9090/search',
    CATALOG_API_URL: 'http://api-gateway-internal-stage.fptsinternal.com/catalogapi',
    LISTING_API_URL: 'http://192.168.0.180:9090/listing',
    PIM_API_URL: 'http://api-gateway-internal-stage.fptsinternal.com/pim-service/pim',
    CMS_API_URL: 'http://192.168.0.180:9090/cms',
    ORDERS_API_URL: 'http://192.168.0.180:9090/order',
    TRANSACTIONS_API_URL: 'http://192.168.0.180:9090/transactions',
    AUTH_API_URL: 'http://192.168.0.180:9090/auth-service',
    CART_API_URL: 'http://192.168.0.180:9090/cart',
    CATEGORYTREE_API_URL: 'http://192.168.0.180:9090/category-tree',
    WISHLIST_API_URL: 'http://192.168.0.180:9090/wl',
    FCM_API_URL: 'http://192.168.0.180:9090/fcm',
    REVIEWS_API_URL: 'http://192.168.0.180:9090/reviews',
    VAULT_API_URL: 'http://192.168.0.180:9090/vault',
    TRANSFORMER_API_URL: 'http://transformers-mgmt.fptsinternal.com/fpts/page-config/get-all-pages',
    SUGGESSIONS_URL: 'http://192.168.0.180:9090/auto-suggest/suggest/suggestions',
    COUPONS_URL: 'http://192.168.0.180:9090/dip/fpts',
  },
  dev: {
    IMAGE_SEARCH_URL: 'https://apigateway-dev.tila.com/image-search',
    SEARCH_API_URL: 'https://apigateway-dev.tila.com/search',
    CATALOG_API_URL: 'https://catalogapis-dev.fptechscience.com',
    LISTING_API_URL: 'https://apigateway-dev.tila.com/listing',
    PIM_API_URL: 'https://pimapis-dev.fptechscience.com/pim',
    CMS_API_URL: 'https://apigateway-dev.tila.com/cms',
    ORDERS_API_URL: 'https://apigateway-dev.tila.com/order',
    REFUND_OPTIONS_URL:'https://apigateway-dev.tila.com/order_item',
    TRANSACTIONS_API_URL: 'https://apigateway-dev.tila.com/transactions',
    AUTH_API_URL: 'https://apigateway-dev.tila.com/auth-service',
    CART_API_URL: 'https://apigateway-dev.tila.com/cart',
    CATEGORYTREE_API_URL: 'https://apigateway-dev.tila.com/category-tree',
    WISHLIST_API_URL: 'https://apigateway-dev.tila.com/wl',
    FCM_API_URL: 'https://apigateway-dev.tila.com/fcm',
    REVIEWS_API_URL: 'https://apigateway-dev.tila.com/reviews',
    VAULT_API_URL: 'https://apigateway-dev.tila.com/vault',
    TRANSFORMER_API_URL: 'https://transformers-mgmt.fptsinternal.com/fpts/page-config/get-all-pages',
    SUGGESSIONS_URL: 'https://api-gateway-stage.fptechscience.com/auto-suggest/suggest/suggestions',
    COUPONS_URL: 'https://api-gateway-stage.fptechscience.com/dip/fpts',
  },
  staging: {
    IMAGE_SEARCH_URL: 'https://api-gateway-stage.fptechscience.com/image-search',
    SEARCH_API_URL: 'https://api-gateway-stage.fptechscience.com/search',
    CATALOG_API_URL: 'http://api-gateway-internal-stage.fptsinternal.com/catalogapi',
    LISTING_API_URL: 'https://api-gateway-stage.fptechscience.com/listing',
    PIM_API_URL: 'http://api-gateway-internal-stage.fptsinternal.com/pim-service/pim',
    CMS_API_URL: 'https://api-gateway-stage.fptechscience.com/cms',
    ORDERS_API_URL: 'https://api-gateway-stage.fptechscience.com/order',
    REFUND_OPTIONS_URL:'https://api-gateway-stage.fptechscience.com/order_item',
    TRANSACTIONS_API_URL: 'https://api-gateway-stage.fptechscience.com/transactions',
    AUTH_API_URL: 'https://api-gateway-stage.fptechscience.com/auth-service',
    CART_API_URL: 'https://api-gateway-stage.fptechscience.com/cart',
    CATEGORYTREE_API_URL: 'https://api-gateway-stage.fptechscience.com/category-tree',
    WISHLIST_API_URL: 'https://api-gateway-stage.fptechscience.com/wl',
    FCM_API_URL: 'https://api-gateway-stage.fptechscience.com/fcm',
    REVIEWS_API_URL: 'https://api-gateway-stage.fptechscience.com/reviews',
    VAULT_API_URL: 'https://api-gateway-stage.fptechscience.com/vault',
    TRANSFORMER_API_URL: 'http://transformers-mgmt.fptsinternal.com/fpts/page-config/get-all-pages',
    SUGGESSIONS_URL: 'https://api-gateway-stage.fptechscience.com/auto-suggest/suggest/suggestions',
    COUPONS_URL: 'https://api-gateway-stage.fptechscience.com/dip/fpts',
  },
  stage: {
    IMAGE_SEARCH_URL: 'https://api-gateway-stage.fptechscience.com/image-search',
    SEARCH_API_URL: 'https://api-gateway-stage.fptechscience.com/search',
    CATALOG_API_URL: 'http://api-gateway-internal-stage.fptsinternal.com/catalogapi',
    LISTING_API_URL: 'https://api-gateway-stage.fptechscience.com/listing',
    PIM_API_URL: 'http://api-gateway-internal-stage.fptsinternal.com/pim-service/pim',
    CMS_API_URL: 'https://api-gateway-stage.fptechscience.com/cms',
    ORDERS_API_URL: 'https://api-gateway-stage.fptechscience.com/order',
    REFUND_OPTIONS_URL:'https://api-gateway-stage.fptechscience.com/order_item',
    TRANSACTIONS_API_URL: 'https://api-gateway-stage.fptechscience.com/transactions',
    AUTH_API_URL: 'https://api-gateway-stage.fptechscience.com/auth-service',
    CART_API_URL: 'https://api-gateway-stage.fptechscience.com/cart',
    CATEGORYTREE_API_URL: 'https://api-gateway-stage.fptechscience.com/category-tree',
    WISHLIST_API_URL: 'https://api-gateway-stage.fptechscience.com/wl',
    FCM_API_URL: 'https://api-gateway-stage.fptechscience.com/fcm',
    REVIEWS_API_URL: 'https://api-gateway-stage.fptechscience.com/reviews',
    VAULT_API_URL: 'https://api-gateway-stage.fptechscience.com/vault',
    TRANSFORMER_API_URL: 'http://transformers-mgmt.fptsinternal.com/fpts/page-config/get-all-pages',
    SUGGESSIONS_URL: 'https://api-gateway-stage.fptechscience.com/auto-suggest/suggest/suggestions',
    COUPONS_URL: 'https://api-gateway-stage.fptechscience.com/dip/fpts',
  },
  preprod: {
    IMAGE_SEARCH_URL: 'https://apigateway-preprod.tila.com/image-search',
    SEARCH_API_URL: 'https://apigateway-preprod.tila.com/search',
    CATALOG_API_URL: 'http://api-gateway-internal-stage.fptsinternal.com/catalogapi',
    LISTING_API_URL: 'https://apigateway-preprod.tila.com/listing',
    PIM_API_URL: 'http://apigatewayinternal-preprod.fptsinternal.com/pim-service/pim',
    CMS_API_URL: 'https://apigateway-preprod.tila.com/cms',
    ORDERS_API_URL: 'https://apigateway-preprod.tila.com/order',
    REFUND_OPTIONS_URL:'https://apigateway-preprod.tila.com/order_item',
    TRANSACTIONS_API_URL: 'https://apigateway-preprod.tila.com/transactions',
    AUTH_API_URL: 'https://apigateway-preprod.tila.com/auth-service',
    CART_API_URL: 'https://apigateway-preprod.tila.com/cart',
    CATEGORYTREE_API_URL: 'https://apigateway-preprod.tila.com/category-tree',
    WISHLIST_API_URL: 'https://apigateway-preprod.tila.com/wl',
    FCM_API_URL: 'https://apigateway-preprod.tila.com/fcm',
    REVIEWS_API_URL: 'https://apigateway-preprod.tila.com/reviews',
    VAULT_API_URL: 'https://apigateway-preprod.tila.com/vault',
    TRANSFORMER_API_URL: 'http://transformers-mgmt.fptsinternal.com/fpts/page-config/get-all-pages',
    SUGGESSIONS_URL: 'https://api-gateway-stage.fptechscience.com/auto-suggest/suggest/suggestions',
    COUPONS_URL: 'https://api-gateway-stage.fptechscience.com/dip/fpts',
  },
  prod: {
    IMAGE_SEARCH_URL: 'https://gateway-dev.fptechscience.com/image-search',
    SEARCH_API_URL: 'http://gateway-dev.fptechscience.com/search',
    CATALOG_API_URL: 'http://api-gateway-internal-stage.fptsinternal.com',
    LISTING_API_URL: 'http://gateway-dev.fptechscience.com/listing',
    PIM_API_URL: 'http://pimapis-dev.fptechscience.com/pim',
    CMS_API_URL: 'http://gateway-dev.fptechscience.com/cms',
    ORDERS_API_URL: 'http://gateway-dev.fptechscience.com/order',
    REFUND_OPTIONS_URL:'https://gateway-dev.fptechscience.com/order_item',
    TRANSACTIONS_API_URL: 'http://gateway-dev.fptechscience.com/transactions',
    AUTH_API_URL: 'http://gateway-dev.fptechscience.com/auth-service',
    CART_API_URL: 'http://gateway-dev.fptechscience.com/cart',
    CATEGORYTREE_API_URL: 'http://gateway-dev.fptechscience.com/category-tree',
    WISHLIST_API_URL: 'http://gateway-dev.fptechscience.com/wl',
    FCM_API_URL: 'http://gateway-dev.fptechscience.com/fcm',
    REVIEWS_API_URL: 'http://gateway-dev.fptechscience.com/reviews',
    VAULT_API_URL: 'http://gateway-dev.fptechscience.com/vault',
    TRANSFORMER_API_URL: 'http://transformers-mgmt.fptsinternal.com/fpts/page-config/get-all-pages',
    SUGGESSIONS_URL: 'https://api-gateway-stage.fptechscience.com/auto-suggest/suggest/suggestions',
    COUPONS_URL: 'https://api-gateway-stage.fptechscience.com/dip/fpts',
  },
};
// console.log('constants.js 2', a);
const b = env || 'preprod';
const c = a[b];

module.exports = c;
