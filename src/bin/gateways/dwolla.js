let db = require('../../models/index');
let uuid4 = require('uuid/v4');
const dwolla = require('dwolla-v2');

let client_id = process.env.DWOLLA_CLIENT_ID;
let cliclient_secret = process.env.DWOLLA_CLIENT_SECRET;

const client = new dwolla.Client({
    key: client_id,
    secret: cliclient_secret,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox' // optional - defaults to production
});

client.auth.client().then(appToken => {
    appToken.get('customers').then(async (resp) => {
        if (resp.status == 200) {
            let customers = resp.body._embedded.customers;
            for (let customer of customers) {
                //retrieve user from db
                let user = await db.User.findOne({ where: { email: customer.email } });
                //if not found, create a new user
                if (!user) {
                    user = await db.User.create({
                        uuid: uuid4(),
                        username: 'jp_' + customer.email.split('@')[0],
                        email: customer.email,
                        password: null,
                        is_verified: customer.status == 'verified' ? 'true' : false,
                        created_at: parseInt(Date.now() / 1000, 10) // 10-digit timestamp
                    });
                    console.log('User ' + user.email + ' added OK');
                }

                let account = await db.Account.findOne({
                    where:
                        { account_email: user.email, gateway: 'dwolla' }
                });
                if (!account) {
                    account = await db.Account.create({
                        uuid: user.uuid,
                        auid: uuid4(),
                        gateway: 'dwolla',
                        account_id: customer.id,
                        account_email: customer.email,
                        created_at: parseInt(Date.parse(customer.created) / 1000)
                    })
                    console.log('Account ' + account.account_email + ' added OK');
                }
                // payment here
            }

            console.log('Init Dwolla Good!')
        } else {
            console.error('Dwolla Error!')
        }
    })
});