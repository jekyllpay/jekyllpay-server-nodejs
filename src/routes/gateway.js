const Router = require('koa-router')
const router = new Router({ prefix: "/gateway" });

router.get('/', (ctx, next) => {
    ctx.body = {
        code: '200',
        status: 'success',
        message: 'hello, gateway',
        data: null
    }
});


module.exports = router;