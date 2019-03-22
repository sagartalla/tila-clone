const routes = require('next-routes')();

routes
  .add({ name: 'login', pattern: '/:country/:language/login', page: 'login' })
  .add({ name: 'CAM', pattern: '/:country/:language/cam', page: 'cam' })
  .add({ name: 'ORDER ISSUE', pattern: '/:country/:language/cam/orders/:orderId/issue/:returnExchangeType/item/:orderItemId', page: 'order' })
  .add({ name: 'ORDER', pattern: '/:country/:language/cam/orders/:orderId', page: 'order' })
  .add({ name: 'CAM tabs', pattern: '/:country/:language/cam/:tabDetails+', page: 'cam' })
  .add({ name: 'product', pattern: '/:country/:language/product', page: 'product' })
  .add({ name: 'Cart', pattern: '/:country/:language/cart', page: 'cart' })
  .add({ name: 'payment', pattern: '/:country/:language/payment', page: 'payment' })
  .add({ name: 'thankyou', pattern: '/:country/:language/thankyou/:orderId/:status(SUCCESSFUL|FAILED)', page: 'thankyou' })
  .add({ name: 'landing', pattern: '/:country/:language/landing/:category', page: 'index' })
  .add({ name: 'search', pattern: '/:country/:language/srp/:category?/:subCategory?', page: 'search' })
  .add({ name: 'compare', pattern: '/:country/:language/compare', page: 'compare' })
  .add({ name: 'policy', pattern: '/:country/:language/policy/:name', page: 'policy' })
  .add({ name: 'resetpassword', pattern: '/:country/:language/resetpassword/:token', page: 'resetPassword' })
  .add({ name: '3dsecure', pattern: '/gateway/callback/:encryptedString', page: 'redirect' })
  .add({ name: 'default', pattern: '/:country/:language', page: 'index' });

module.exports = routes;
