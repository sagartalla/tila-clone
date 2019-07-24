const routes = require('next-routes')();

routes
  .add({ name: 'login', pattern: '/login', page: 'login' })
  .add({ name: 'CAM', pattern: '/:language/customer', page: 'cam' })
  .add({ name: 'ORDER ISSUE', pattern: '/:language/customer/orders/:orderId/issue/:returnExchangeType/item/:orderItemId/:variantId', page: 'order' })
  .add({ name: 'ORDER', pattern: '/:language/customer/orders/:orderId', page: 'order' })
  .add({ name: 'CAM tabs', pattern: '/:language/customer/:tabDetails+', page: 'cam' })
  .add({ name: 'product', pattern: '/:language/pdp/:productName?/c/:catalogId/p/:productId/l/:listingId?/v/:variantId?', page: 'product' })
  .add({ name: 'Cart', pattern: '/:language/cart', page: 'cart' })
  .add({ name: 'payment', pattern: '/:language/payment', page: 'payment' })
  .add({ name: 'thankyou', pattern: '/:language/thankyou/:orderId/:status(SUCCESSFUL|FAILED)', page: 'thankyou' })
  .add({ name: 'landing', pattern: '/:language/landing/:category', page: 'index' })
  .add({ name: 'srp', pattern: '/:language/srp/:category?/:subCategory?', page: 'search' })
  .add({ name: 'search', pattern: '/:language/search/:category?/:subCategory?', page: 'search' })
  .add({ name: 'compare', pattern: '/:language/compare', page: 'compare' })
  .add({ name: 'policy', pattern: '/:language/policy/:name', page: 'policy' })
  .add({ name: 'resetpassword', pattern: '/:language/resetpassword', page: 'resetPassword' })
  .add({ name: '3dsecure', pattern: '/:language/gateway/callback/:encryptedString', page: 'threeDRedirect' })
  .add({ name: 'help', pattern: '/:language/help/(.*)', page: 'help' })
  .add({ name: 'brand', pattern: '/:language/brand/:brandName', page: 'brand' })
  .add({ name: 'ftb', pattern: '/:language/ftb', page: 'ftb' })
  .add({ name: 'redirect', pattern: '/:country/:language', page: 'homeRedirect' })
  .add({ name: 'default', pattern: '/:language?', page: 'index' });

module.exports = routes;
