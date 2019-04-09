require('dotenv').config();

const Router = require('koa-router')
const router = new Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.post('/', (ctx, next) => {
    // ctx.status = 201;
    let customers = [];
    // stripe.customers.list({ limit: 100 },
    //     function (err, customers) {
    //         console.log(customers.data);
    //         customers = customers.data;
    //     }
    // );
    ctx.body = {
        code: '200',
        status: 'success',
        message: 'Stripe OK',
        data: customers
    }
});


module.exports = router;