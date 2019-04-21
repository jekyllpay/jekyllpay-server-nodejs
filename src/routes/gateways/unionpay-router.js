const path = require('path')
const Router = require('koa-router')
const router = new Router();

const UNIONPAY_ACCOUNT_KEY = process.env.UNIONPAY_ACCOUNT_KEY;

let db = require(path.resolve('src', 'models/index'));

router.get('/', (ctx, next) => {
    ctx.body = {
        code: '200',
        status: 'success',
        message: 'UnionPay OK',
        data: null
    }
});


module.exports = router;