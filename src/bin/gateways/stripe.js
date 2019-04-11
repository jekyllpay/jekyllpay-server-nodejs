
let db = require('../../models/index');

let uuid4 = require('uuid/v4');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

stripe.customers.list({ limit: 100 }, function (err, customers) {
    if (err) {
        console.error(err)
        return;
    }
    for (let customer of customers.data) {
        db.User.create({
            uuid: uuid4(),
            username: 'jp_' + customer.email.split('@')[0],
            email: customer.email,
            password: null,
            is_verified: true,
            created_at: customer.created
        }).then(user => console.log('User ' + user.email + ' added.'))
    }
})



/** same result */
// stripe.customers.list().autoPagingEach(async (customer) => {
//     await console.log(customer.id)
// }).then(() => {
//     console.log('Done iterating.');
// }).catch(err => console.log(err));