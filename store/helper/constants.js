var getConfig = require('next/config');
var config = getConfig.default();

var env = config || '';
env = env.publicRuntimeConfig || '';
env = env.env || '';

env = env || process.env.ENV;

export default {
  local: {
    SEARCH_API_URL        :   'http://gateway-dev.fptechscience.com/search',
    CATALOG_API_URL       :   'http://catalogapis-dev.fptechscience.com',
    LISTING_API_URL       :   'http://gateway-dev.fptechscience.com/listing',
    PIM_API_URL           :   'http://pimapis-dev.fptechscience.com/pim',
    CMS_API_URL           :   'http://gateway-dev.fptechscience.com/cms',
    ORDERS_API_URL        :   'http://gateway-dev.fptechscience.com/order',
    TRANSACTIONS_API_URL  :   'http://gateway-dev.fptechscience.com/transactions',
    AUTH_API_URL          :   'http://gateway-dev.fptechscience.com/auth-service',
    CART_API_URL          :   'http://gateway-dev.fptechscience.com/cart',
    CATEGORYTREE_API_URL  :   'http://gateway-dev.fptechscience.com/category-tree',
    WISHLIST_API_URL      :   'http://gateway-dev.fptechscience.com/wl',
    FCM_API_URL           :   'http://gateway-dev.fptechscience.com/fcm',
    REVIEWS_API_URL       :   'http://gateway-dev.fptechscience.com/reviews',
    VAULT_API_URL         :   'http://gateway-dev.fptechscience.com/vault',
  },
  dev: {
    SEARCH_API_URL        :   'http://gateway-dev.fptechscience.com/search',
    CATALOG_API_URL       :   'http://catalogapis-dev.fptechscience.com',
    LISTING_API_URL       :   'http://gateway-dev.fptechscience.com/listing',
    PIM_API_URL           :   'http://pimapis-dev.fptechscience.com/pim',
    CMS_API_URL           :   'http://gateway-dev.fptechscience.com/cms',
    ORDERS_API_URL        :   'http://gateway-dev.fptechscience.com/order',
    TRANSACTIONS_API_URL  :   'http://gateway-dev.fptechscience.com/transactions',
    AUTH_API_URL          :   'http://gateway-dev.fptechscience.com/auth-service',
    CART_API_URL          :   'http://gateway-dev.fptechscience.com/cart',
    CATEGORYTREE_API_URL  :   'http://gateway-dev.fptechscience.com/category-tree',
    WISHLIST_API_URL      :   'http://gateway-dev.fptechscience.com/wl',
    FCM_API_URL           :   'http://gateway-dev.fptechscience.com/fcm',
    REVIEWS_API_URL       :   'http://gateway-dev.fptechscience.com/reviews',
    VAULT_API_URL         :   'http://gateway-dev.fptechscience.com/vault',
  },
  staging: {
    SEARCH_API_URL        :   '//api-gateway-stage.fptechscience.com/search',
    CATALOG_API_URL       :   '//catalogapi-stage.fptsinternal.com/',
    LISTING_API_URL       :   '//api-gateway-stage.fptechscience.com/listing',
    PIM_API_URL           :   '//pimapis-dev.fptechscience.com/pim',
    CMS_API_URL           :   '//api-gateway-stage.fptechscience.com/cms',
    ORDERS_API_URL        :   '//api-gateway-stage.fptechscience.com/order',
    TRANSACTIONS_API_URL  :   '//api-gateway-stage.fptechscience.com/transactions',
    AUTH_API_URL          :   '//api-gateway-stage.fptechscience.com/auth-service',
    CART_API_URL          :   '//api-gateway-stage.fptechscience.com/cart',
    CATEGORYTREE_API_URL  :   '//api-gateway-stage.fptechscience.com/category-tree',
    WISHLIST_API_URL      :   '//api-gateway-stage.fptechscience.com/wl',
    FCM_API_URL           :   '//api-gateway-stage.fptechscience.com/fcm',
    REVIEWS_API_URL       :   '//api-gateway-stage.fptechscience.com/reviews',
    VAULT_API_URL         :   '//api-gateway-stage.fptechscience.com/vault',
  },
  production: {
    SEARCH_API_URL        :   'http://gateway-dev.fptechscience.com/search',
    CATALOG_API_URL       :   'http://catalogapis-dev.fptechscience.com',
    LISTING_API_URL       :   'http://gateway-dev.fptechscience.com/listing',
    PIM_API_URL           :   'http://pimapis-dev.fptechscience.com/pim',
    CMS_API_URL           :   'http://gateway-dev.fptechscience.com/cms',
    ORDERS_API_URL        :   'http://gateway-dev.fptechscience.com/order',
    TRANSACTIONS_API_URL  :   'http://gateway-dev.fptechscience.com/transactions',
    AUTH_API_URL          :   'http://gateway-dev.fptechscience.com/auth-service',
    CART_API_URL          :   'http://gateway-dev.fptechscience.com/cart',
    CATEGORYTREE_API_URL  :   'http://gateway-dev.fptechscience.com/category-tree',
    WISHLIST_API_URL      :   'http://gateway-dev.fptechscience.com/wl',
    FCM_API_URL           :   'http://gateway-dev.fptechscience.com/fcm',
    REVIEWS_API_URL       :   'http://gateway-dev.fptechscience.com/reviews',
    VAULT_API_URL         :   'http://gateway-dev.fptechscience.com/vault',
  }
}[env || 'dev'];
