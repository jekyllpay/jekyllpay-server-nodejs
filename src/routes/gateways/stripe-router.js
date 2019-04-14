require('dotenv').config();

const Router = require('koa-router')
const router = new Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.post('/charge', async (ctx, next) => {
    let customers = [];

    let { stripe_token, first_name, last_name, email, amount, currency, phone } = ctx.request.body;

    /**
     * determine whether is's a new customer
     * if yes, create a new one based on the request body
     * if no, retrieve the customer's id from database and create a charge
     */


    /** create a new charge */
    const { charge, error } = await stripe.charges.create({
        amount: amount,
        currency: currency,
        /** the following fields are optional */
        customer: null, //customer id in Stripe (User's account_id ) 
        description: 'Example charge',
        statement_descriptor: "Jekyll Web Services", // up to 22 characters
        source: stripe_token
    });

    ctx.status = 201;
    ctx.body = {
        code: 'JP_CHARGE_SUCCESS',
        status: 'success',
        message: 'Stripe Charge OK',
        data: customers
    }
});


module.exports = router;