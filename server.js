const next = require('next');
const express = require('express');
const routes = require('./routes');
const apiRoutes = require('./apiRoutes');
const server = express();
const bodyParser = require('body-parser');
const cookiesMiddleware = require('universal-cookie-express');

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
