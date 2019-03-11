'use strict';

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

require('dotenv').config();

const Helmet = require('koa-helmet')
const path = require('path');


const view = require('koa-ejs');

const serve = require("koa-static");
const mount = require('koa-mount');

let db = require('./libs/database/db');



app.use(Helmet());


app.use(mount("/assets", serve(__dirname + '/resources/assets')));



const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

view(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});


// API routes
// require('./routes')(router)
// app.use(router.routes())
// app.use(router.allowedMethods())

router.get('/', async (ctx, next) => {
  await ctx.render('home');
});

app.use(router.routes());
const port = process.env.PORT || 3000;
app.listen(port);