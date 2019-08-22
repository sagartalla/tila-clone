const routes = require('next-routes')();

routes
  .add({ name: 'login', pattern: '/login', page: 'login' })
  .add({ name: 'CAM', pattern: '/:language(en|ar)/customer', page: 'cam' })
  .add({ name: 'ORDER ISSUE', pattern: '/:language(en|ar)/customer/orders/:orderId/issue/:returnExchangeType/item/:orderItemId/:variantId/:listingId', page: 'order' })
  .add({ name: 'ORDER', pattern: '/:language(en|ar)/customer/orders/:orderId', page: 'order' })
  .add({ name: 'CAM tabs', pattern: '/:language(en|ar)/customer/:tabDetails+', page: 'cam' })
  .add({ name: 'product', pattern: '/:language(en|ar)/pdp/:productName/:tuinId?/:listingId?', page: 'product' })
  .add({ name: 'Cart', pattern: '/:language(en|ar)/cart', page: 'cart' })
  .add({ name: 'payment', pattern: '/:language(en|ar)/payment', page: 'payment' })
  .add({ name: 'thankyou', pattern: '/:language(en|ar)/thankyou/:orderId/:status(SUCCESSFUL|FAILED)', page: 'thankyou' })
  .add({ name: 'landing', pattern: '/:language(en|ar)/landing/:category', page: 'index' })
  .add({ name: 'srp', pattern: '/:language(en|ar)/srp/:category?/:subCategory?', page: 'search' })
  .add({ name: 'search', pattern: '/:language(en|ar)/search/:category?/:subCategory?', page: 'search' })
  .add({ name: 'compare', pattern: '/:language(en|ar)/compare', page: 'compare' })
  .add({ name: 'policy', pattern: '/:language(en|ar)/policy/:name', page: 'policy' })
  .add({ name: 'resetpassword', pattern: '/:language(en|ar)/resetpassword', page: 'resetPassword' })
  .add({ name: '3dsecure', pattern: '/:language(en|ar)/gateway/callback/:encryptedString', page: 'threeDRedirect' })
  .add({ name: 'help', pattern: '/:language(en|ar)/help/(.*)', page: 'help' })
  .add({ name: 'brand', pattern: '/:language(en|ar)/brand/:brandName', page: 'brand' })
  .add({ name: 'ftb', pattern: '/:language(en|ar)/ftb', page: 'ftb' })
  .add({ name: 'redirect', pattern: '/:country/:language(en|ar)', page: 'homeRedirect' })
  .add({ name: 'categoryLanding', pattern: '/:language(en|ar)/:category(electronics|fashion|lifestyle)', page: 'home' })
  .add({ name: 'category', pattern: '/:language(en|ar)/clp/:category', page: 'category' })
  .add({ name: 'default', pattern: '/:language(en|ar)?', page: 'home' })
  .add({ name: 'items-zone', pattern: '/:language(en|ar)/items-zone/:zone', page: 'itemsZone' })
  .add({ name: 'verifyemail', pattern: '/:language(en|ar)/email/verify', page: 'verifyEmail' });

module.exports = routes;
