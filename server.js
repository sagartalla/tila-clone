require('./deploy/env');

const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const cookiesMiddleware = require('universal-cookie-express');
const routes = require('./routes');
const apiRoutes = require('./apiRoutes');
require('./utils/error-handle');


const server = express();

const app = next({ dev: process.env.NODE_ENV !== 'production' })

const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  global.APP_LANGUAGE = req.universalCookies.cookies.language;
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
