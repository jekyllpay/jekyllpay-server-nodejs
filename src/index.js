'use strict';

const Koa = require('koa');
const Router = require('koa-router');

require('dotenv').config();

const app = new Koa();
const router = new Router();

const Helmet = require('koa-helmet')

let db = require('./models/index');

app.use(Helmet());

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// API routes
// require('./routes')(router)

router.get('/', (ctx, next) => {
  ctx.body = 'Hello world';
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port);