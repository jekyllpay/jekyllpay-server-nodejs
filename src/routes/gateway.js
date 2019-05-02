const Router = require('koa-router')
const router = new Router({ prefix: "/gateway" });

const stripeRouter = require('./gateways/stripe-router');
const unionpayRouter = require('./gateways/unionpay-router');
const paypalRouter = require('./gateways/paypal-router');
const dwollaRouter = require('./gateways/dwolla-router')

router.get('/', (ctx, next) => {
    ctx.status = 403;
    ctx.body = {
        message: "403 Forbidden"
    };
});

router.use('/stripe', stripeRouter.routes());
router.use('/unionpay', unionpayRouter.routes());
router.use('/paypal', paypalRouter.routes());
router.use('/dwolla', dwollaRouter.routes());


module.exports = router;