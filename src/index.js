'use strict';

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const path = require('path');

const view = require('koa-ejs');

const serve = require("koa-static");
const mount = require('koa-mount');
app.use(mount("/assets", serve("./resources/assets")));

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

view(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});


router.get('/', async (ctx, next) => {
  await ctx.render('home');
});
 
app.use(router.routes());

app.listen(3000);