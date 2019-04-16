require('dotenv').config();
const path = require('path')
const Router = require('koa-router')
const router = new Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

let db = require(path.resolve('src', 'models/index'));


router.post('/charge', async (ctx, next) => {

    let { stripe_token, first_name, last_name, email, amount, currency, phone } = ctx.request.body;

    /** authenticate token itself */
    let token;
    try {
        token = await stripe.tokens.retrieve(stripe_token.id);
    } catch (error) {
        /** request should be recorded
         *  TODO: implement anti-spam methods
         */
        ctx.throw(400, 'Error Code: JP_CHARGE_TOKEN_ERROR');
    }

    /**
     * determine whether is's a new customer
     * if yes, create a new one based on the request body
     * if no, retrieve the customer's id from database and create a charge
     */

    let user = await db.User.findOne({ where: { email: email } });
    let account;
    let payment;

    if (user === null) {
        user = await db.User.create({
            uuid: uuid4(),
            username: 'jp_' + email.split('@')[0],
            email: email,
            password: null,
            is_verified: false,
            created_at: parseInt(Date.now() / 1000) // 10-digit timestamp
        });

        account = await db.Account.create();
        payment = await db.Payment.create();

        ctx.status = 201;
        ctx.body = {
            code: 'JP_CHARGE_SUCCESS',
            status: 'success',
            message: 'Stripe Charge OK',
            data: payment
        }

    }

    account = await db.Account.findOne({ where: { uuid: user.uuid } })


    /** create a new charge */
    const { charge, error } = await stripe.charges.create({
        amount: amount,
        currency: currency,
        /** the following fields are optional */
        customer: account.account_id, //customer id in Stripe (User's account's account_id ) 
        description: 'Example charge',
        statement_descriptor: "Jekyll Web Services", // up to 22 characters
        source: token.id
    });

    ctx.status = 201;
    ctx.body = {
        code: 'JP_CHARGE_SUCCESS',
        status: 'success',
        message: 'Stripe Charge OK',
        data: payment
    }

});


module.exports = router;