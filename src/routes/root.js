const Router = require('koa-router')
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = {
        code: '200',
        status: 'success',
        message: 'hello, world!',
        data: null
    }
});


module.exports = router;