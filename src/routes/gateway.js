const Router = require('koa-router')
const router = new Router({ prefix: "/gateway" });

const stripeRouter = require('./gateways/stripe-router');
const unionpayRouter = require('./gateways/unionpay-router');
const paypalRouter = require('./gateways/paypal-router');
const braintreeRouter = require('./gateways/braintree-router');

router.get('/', (ctx, next) => {
    ctx.status = 403;
    ctx.body = {
        message: "Not Authorized"
    };
});

router.use('/stripe', stripeRouter.routes());
router.use('/unionpay', unionpayRouter.routes());
router.use('/paypal', paypalRouter.routes());
router.use('/braintree', braintreeRouter.routes());


module.exports = router;