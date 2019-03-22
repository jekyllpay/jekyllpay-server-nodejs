'use strict';

const Koa = require('koa');

require('dotenv').config();

const app = new Koa();

const Helmet = require('koa-helmet')

let db = require('./models/index');

app.use(Helmet());

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// API routes
const rootRouter = require('./routes/root');
const gatewayRouter = require('./routes/gateway');

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.use(gatewayRouter.routes());
app.use(gatewayRouter.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port);