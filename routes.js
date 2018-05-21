const routes = require('next-routes')();

routes
  .add({ name: 'CAM', pattern: '/cam', page: 'cam' })
  .add({ name: 'ORDER', pattern: '/cam/orders/:orderId', page: 'order' })
  .add({ name: 'CAM tabs', pattern: '/cam/:tabDetails+', page: 'cam' })
  .add({ name: 'product', pattern: '/product', page: 'product' })
  .add({ name: 'search', pattern: '/:category?/:subCategory?', page: 'index' });
  
module.exports = routes
