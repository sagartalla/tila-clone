// require('./deploy/env');
if(process.env.npm_package_config_ENV) {
  process.env.ENV = process.env.npm_package_config_ENV;
}
const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const cookiesMiddleware = require('universal-cookie-express');
const routes = require('./routes');
const apiRoutes = require('./apiRoutes');
require('./utils/error-handle');


const server = express();

server.get('/', (req, res) => {
  global.APP_LANGUAGE = (req.headers.cookie.match(/language=(.+?);/) || [])[1] || 'en';
  global.APP_COUNTRY = (req.headers.cookie.match(/country=(.+?);/) || [])[1]|| 'SAU';
  // if(req.originalUrl === '/') {
  res.redirect(302, '/' + APP_COUNTRY + '/' + APP_LANGUAGE);
  // }
});

const app = next({ dev: process.env.NODE_ENV !== 'production' })

const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  app.render(req, res, route.page, query)
});

app.prepare().then(() => {
  server
    .use(bodyParser.urlencoded({
      extended: true
    }))
    .use(bodyParser.json())
    // .use(cookieParser())
    .use(cookiesMiddleware())
    .use('/api', apiRoutes)
    .use(handler).listen(process.env.PORT || 3000);
});
