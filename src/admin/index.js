'use strict';

const Koa = require('koa');
const adminApp = new Koa();
const path = require('path');

const cors = require('@koa/cors');
const Helmet = require('koa-helmet');
let db = require(path.resolve('src', 'models/index'));

const originWhiteList = ["http://localhost:8081", "http://localhost:5500"];

adminApp.use(cors({
    origin: ctx => originWhiteList.includes(ctx.request.header.origin) ? ctx.request.header.origin : ctx.throw(400, 'Not Valid Origin')
}));
adminApp.use(Helmet());

const bodyParser = require('koa-bodyparser');
adminApp.use(bodyParser());

// API routes
const rootRouter = require('./routes/root');
// const userRouter = require('./routes/user');
// const gatewayRouter = require('./routes/gateway');

adminApp.use(rootRouter.routes());
adminApp.use(rootRouter.allowedMethods());

// adminApp.use(userRouter.routes());
// adminApp.use(userRouter.allowedMethods());

// adminApp.use(gatewayRouter.routes());
// adminApp.use(gatewayRouter.allowedMethods());

module.exports = adminApp;