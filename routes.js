const routes = require('next-routes')();

routes
  .add({ name: 'search', pattern: '/:category/:subCategory', page: 'index' });

module.exports = routes