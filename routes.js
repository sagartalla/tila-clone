const routes = require('next-routes')();

routes
  .add({ name: 'login', pattern: '/login', page: 'login'})
  .add({ name: 'CAM', pattern: '/cam', page: 'cam' })
  .add({ name: 'ORDER ISSUE', pattern: '/cam/orders/:orderId/issue/:returnExchangeType/item/:orderItemId', page: 'order' })
  .add({ name: 'ORDER', pattern: '/cam/orders/:orderId', page: 'order' })
  .add({ name: 'CAM tabs', pattern: '/cam/:tabDetails+', page: 'cam' })
  .add({ name: 'product', pattern: '/product', page: 'product' })
  .add({ name: 'Cart', pattern: '/cart', page: 'cart' })
  .add({ name: 'payment', pattern: '/payment', page: 'payment' })
  .add({ name: 'thankyou', pattern: '/thankyou/:orderId/:status(SUCCESSFUL|FAILED)', page: 'thankyou' })
  .add({ name: 'landing', pattern: '/landing/:category', page: 'index'})
  .add({ name: 'search', pattern: '/srp/:category?/:subCategory?', page: 'search' })
  .add({ name: 'compare', pattern: '/compare', page: 'compare' })
  .add({ name: 'default', pattern: '/', page: 'index'})
  ;

module.exports = routes;
