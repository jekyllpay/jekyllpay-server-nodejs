const Router = require('koa-router')
const router = new Router();
const path = require('path')
let db = require(path.resolve('src', 'models/index'));
const axios = require('axios');

const UNIONPAY_ACCOUNT_KEY  = process.env.UNIONPAY_ACCOUNT_KEY;

const urls = {
    purchaseUrl : `https://developer.unionpayintl.com/proxy/QRCodeAT/PURCHASE/${UNIONPAY_ACCOUNT_KEY}`,
    voidUrl :   `https://developer.unionpayintl.com/proxy/QRCodeAT/VOID/${UNIONPAY_ACCOUNT_KEY}`,
    refundUrl : `https://developer.unionpayintl.com/proxy/QRCodeAT/REFUND/${UNIONPAY_ACCOUNT_KEY}`
}

router.all('/', (ctx, next) => {
    ctx.status = 403;
    ctx.body = {
        message: 'Not Authorized!',
        data: null
    }
});

router.post('/customer-presented-qrcode/purchase', async (ctx, next) => {
    urls.purchaseUrl = "https://uaistest.unionpayintl.com/uais";
    let resp = await axios.request({
        url: urls.purchaseUrl,
        method: 'post',
        data: ctx.request.body
    });
    ctx.status = 200;
    ctx.body = resp.data;
});


module.exports = router;