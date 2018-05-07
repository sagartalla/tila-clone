const routes = require('next-routes')();

routes
  .add({ name: 'product', pattern: '/product', page: 'product' })
  .add({ name: 'search', pattern: '/:category?/:subCategory?', page: 'index' })
  
module.exports = routes
