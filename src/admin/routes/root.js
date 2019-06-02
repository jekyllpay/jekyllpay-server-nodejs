const Router = require('koa-router')
const router = new Router();

router.all('/', (ctx, next) => {
    ctx.body = {
        message: 'Welcome to Jekyll Pay Admin Dashboard!'
    }
});

module.exports = router;