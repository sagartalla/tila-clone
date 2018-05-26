const next = require('next');
const routes = require('./routes');
const express = require('express');

const app = next({ dev: process.env.NODE_ENV !== 'production' })

const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
    app.render(req, res, route.page, query)
});

app.prepare().then(() => {
    express().use(handler).listen(process.env.PORT || 3000);
});
