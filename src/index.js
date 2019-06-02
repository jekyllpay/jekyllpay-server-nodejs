'use strict';

const Koa = require('koa');
const app = new Koa();
const mount = require('koa-mount');
const cors = require('@koa/cors');
const Helmet = require('koa-helmet');

let db = require('./models/index');

const originWhiteList = ['http://localhost:8081'];
app.use(cors({
    origin: ctx => originWhiteList.includes(ctx.request.header.origin) ? ctx.request.header.origin : ctx.throw(400, 'Not Valid Origin')
}));

app.use(Helmet());

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// API routes
const rootRouter = require('./routes/root');
const userRouter = require('./routes/user');
const gatewayRouter = require('./routes/gateway');

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(gatewayRouter.routes());
app.use(gatewayRouter.allowedMethods());

const adminApp = require('./admin/index');
app.use(mount('/admin', adminApp));

const port = process.env.PORT || 8080;
app.listen(port);