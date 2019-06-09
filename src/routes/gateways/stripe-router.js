const path = require('path')
const Router = require('koa-router')
const router = new Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

let db = require(path.resolve('src', 'models/index'));
let uuid4 = require('uuid/v4');

router.all('/', async (ctx, next) => {
    ctx.status = 403;
    ctx.body = {
        message: 'Not Authorized!',
        data: null
    }
})

router.post('/charge', async (ctx, next) => {

    let { stripe_token_id, first_name, last_name, email, pay_method, amount, currency, phone, message } = ctx.request.body;

    /** authenticate token itself */
    let token;
    try {
        token = await stripe.tokens.retrieve(stripe_token_id);
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

    let customer;
    let user = await db.User.findOne({ where: { email: email } });
    let account = user === null ? null : await db.Account.findOne({
        where: { uuid: user.uuid, account_email: user.email, gateway: "stripe" }
    });
    let charge;
    let payment;

    if (user === null) {
        /**  try catch ?
         * since we have done "init" duiring setup, 
         * we assume all cusomters have been retrieved and stored in our db
         * Thus, we will be able to create a new customer with any email that is NOT in db
         */
        customer = await stripe.customers.create({
            source: token.id,
            email: email
        });

        user = await db.User.create({
            uuid: uuid4(),
            username: 'jp_' + email.split('@')[0],
            email: email,
            password: null,
            is_verified: false,
            created_at: parseInt(Date.now() / 1000, 10), // 10-digit timestamp
            first_name: first_name,
            last_name: last_name,
            cell_phone: phone
        });

    }
    if (account === null) {
        account = await db.Account.create({
            uuid: user.uuid,
            auid: uuid4(),
            gateway: 'stripe',
            account_id: customer.id,
            account_email: customer.email,
            created_at: customer.created
        });
    }

    /** try to create a new charge */
    try {
        charge = await stripe.charges.create({
            amount: amount,
            currency: currency,
            /** the following fields are optional */
            customer: account.account_id, //customer id in Stripe (User's account's account_id ) 
            description: 'Example charge',
            statement_descriptor: "Jekyll Web Services"// up to 22 characters
            // source:token.id // since we already have a customer id, source should the ID of a bank account or a card of such customer
        });
    } catch (error) {
        ctx.throw(400, 'Error Code: JP_CHARGE_GATEWAY_ERROR');
    }

    payment = await db.Payment.create({
        uuid: account.uuid,
        auid: account.auid,
        puid: uuid4(),
        gateway: "stripe",
        method: pay_method,
        transaction_id: charge.id,
        amount: amount,
        currency: currency,
        min_unit: "cent",
        status: "SUCCESS",
        memo: message,
        created_at: charge.created
    });

    ctx.status = 201;
    ctx.body = {
        code: 'JP_CHARGE_SUCCESS',
        status: 'success',
        message: 'Stripe Charge OK',
        data: {
            method: payment.method,
            transaction_id: payment.transaction_id,
            amount: parseFloat(payment.amount / 100, 10),
            currency: payment.currency,
            status: payment.status,
            memo: payment.memo,
            created_at: payment.created_at
        }
    }

});


module.exports = router;