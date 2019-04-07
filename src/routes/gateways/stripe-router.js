const Router = require('koa-router')
const router = new Router();


router.post('/', (ctx, next) => {
    // ctx.status = 201;
    ctx.body = {
        code: '200',
        status: 'success',
        message: 'Stripe OK',
        data: null
    }
});


module.exports = router;