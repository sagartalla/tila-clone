const routes = require('next-routes')();

routes
  .add({ name: 'CAM', pattern: '/cam', page: 'cam' })
  .add({ name: 'product', pattern: '/product', page: 'product' })
  .add({ name: 'search', pattern: '/search/:category?/:subCategory?', page: 'index' });
  
module.exports = routes
