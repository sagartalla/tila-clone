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
const uuidv4 = require('uuid/v4')
require('./utils/error-handle');


const server = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

function sessionCookie(req, res, next) {
  const htmlPage =
    !req.path.match(/^\/(_next|static)/) &&
    !req.path.match(/\.(js|map)$/) &&
    req.accepts('text/html', 'text/css', 'image/png') === 'text/html';
  const isApiRoute = req.path.match(/^\/api/);
  if (!htmlPage || isApiRoute) {
    next();
    return;
  }
  const pathSplit = req.path.split('/');
  const country = pathSplit[1];
  const language = pathSplit[2];
  const cookieCountry = req.universalCookies.get('country');
  const cookieLanguage = req.universalCookies.get('language');
  const sid = req.universalCookies.get('sessionId');
  if (!sid || sid.length === 0) {
    req.universalCookies.set('sessionId', uuidv4());
    res.cookie('sessionId', req.universalCookies.get('sessionId'));
  }
  global.APP_LANGUAGE = ['en', 'ar'].indexOf(language) !== -1 ? language : (cookieLanguage ? cookieCountry : 'en');
  global.APP_COUNTRY = country ? country : (cookieCountry ? cookieCountry : 'SAU');

  res.cookie('language', global.APP_LANGUAGE);
  res.cookie('country', global.APP_COUNTRY);
  next();
}

const sourcemapsForSentryOnly = token => (req, res, next) => {
  // In production we only want to serve source maps for sentry
  if (!dev && !!token && req.headers['x-sentry-token'] !== token) {
    res
      .status(401)
      .send('Authentication access token is required to access the source map.')
    return
  }
  next()
}

const app = next({ dev: process.env.NODE_ENV !== 'production' })

const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  app.render(req, res, route.page, query)
});

app.prepare().then(() => {
  // const Sentry  = require('./utils/sentry')({ release: app.buildId }).Sentry
  server
    // .use(Sentry.Handlers.requestHandler())
    .use(bodyParser.urlencoded({
      extended: true
    }))
    .use(bodyParser.json())
    // .use(cookieParser())
    .use(cookiesMiddleware())
    .use(sessionCookie)
    // .get(/\.map$/, sourcemapsForSentryOnly(process.env.SENTRY_TOKEN))
    .use('/api', apiRoutes)
    .use(handler)
    // .use(Sentry.Handlers.errorHandler())
    .listen(port, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on http://localhost:${port}`)
    });
});
