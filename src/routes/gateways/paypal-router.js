const Router = require('koa-router')
const router = new Router();

router.all('/', (ctx, next) => {
    ctx.status = 403;
    ctx.body = {
        message: 'Not Authorized!',
        data: null
    }
});


module.exports = router;