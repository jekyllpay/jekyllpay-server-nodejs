'use strict';

const Koa = require('koa');
const app = new Koa();
const view = require('koa-ejs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

view(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true
});



app.use(async function (ctx) {
  await ctx.render('home');
});

app.listen(3000);