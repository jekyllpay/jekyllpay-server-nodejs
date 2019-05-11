const Router = require('koa-router')
const router = new Router();
const dwolla = require('dwolla-v2');

let access_token = null;
let expired_in = 0;

let client_id = process.env.DWOLLA_CLIENT_ID;
let cliclient_secret = process.env.DWOLLA_CLIENT_SECRET;

const client = new dwolla.Client({
    key: client_id,
    secret: cliclient_secret,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox' // optional - defaults to production
});

async function getAccessToken() {
    if (!access_token || Date.now() >= expired_in) {
        let resp = await client.auth.client();
        access_token = resp.access_token;
        expired_in = Date.now() + 3600 * 1000;
    }
    return access_token;
}

router.all('/', async (ctx, next) => {
    ctx.status = 403;
    ctx.body = "Not Authorized"
})

router.post('/customer', async (ctx, next) => {
    let { firstName, lastName, email, type } = ctx.request.body;
    // let token = await getAccessToken();
    let resp = await client.auth.client();
    let customers = await resp.get('customers');
    console.log(customers.status);
    ctx.body = 'create customer'
})

module.exports = router;