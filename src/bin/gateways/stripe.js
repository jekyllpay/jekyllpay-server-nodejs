
let db = require('../../models/index');
let uuid4 = require('uuid/v4');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

stripe.customers.list().then(async (customers) => {

    for (let customer of customers.data) {
        //retrieve user from db
        let user = await db.User.findOne({ where: { email: customer.email } });
        //if not found, create a new user
        if (!user) {
            user = await db.User.create({
                uuid: uuid4(),
                username: 'jp_' + customer.email.split('@')[0],
                email: customer.email,
                password: null,
                is_verified: true,
                created_at: parseInt(Date.now() / 1000, 10) // 10-digit timestamp
            });
            console.log('User ' + user.email + ' added OK');
        }

        let account = await db.Account.findOne({
            where:
                { account_email: user.email, gateway: 'stripe' }
        });
        if (!account) {
            account = await db.Account.create({
                uuid: user.uuid,
                auid: uuid4(),
                gateway: 'stripe',
                account_id: customer.id,
                account_email: customer.email,
                created_at: customer.created
            })
            console.log('Account ' + account.account_email + ' added OK');
        }

        // payment ( it's "charges" in stripe) here

    }
}).then(err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Init Stripe Good! ')
    }
});



/** same result */
// stripe.customers.list().autoPagingEach(async (customer) => {
//     await console.log(customer.id)
// }).then(() => {
//     console.log('Done iterating.');
// }).catch(err => console.log(err));