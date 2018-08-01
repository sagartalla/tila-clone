const routes = require('next-routes')();

routes
  .add({ name: 'CAM', pattern: '/cam', page: 'cam' })
  .add({ name: 'ORDER ISSUE', pattern: '/cam/orders/:orderId/issue/:returnExchangeType/item/:orderItemId', page: 'order' })
  .add({ name: 'ORDER', pattern: '/cam/orders/:orderId', page: 'order' })
  .add({ name: 'CAM tabs', pattern: '/cam/:tabDetails+', page: 'cam' })
  .add({ name: 'product', pattern: '/product', page: 'product' })
  .add({ name: 'Cart', pattern: '/cart', page: 'cart' })
  .add({ name: 'payment', pattern: '/payment', page: 'payment' })
  .add({ name: 'thankyou', pattern: '/thankyou/:orderId/:status(SUCCESSFUL|FAILURE)', page: 'thankyou' })
  .add({ name: 'compare', pattern: '/compare', page: 'compare' })
  .add({ name: 'search', pattern: '/:category?/:subCategory?', page: 'index' })
  ;

module.exports = routes;
