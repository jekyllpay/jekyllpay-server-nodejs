const Router = require('koa-router')
const router = new Router();
const axios = require('axios');
const dwolla = require('dwolla-v2');

let access_token = null;

let client_id = process.env.DWOLLA_CLIENT_ID;
let cliclient_secret = process.env.DWOLLA_CLIENT_SECRET;

const client = new dwolla.Client({
    key: client_id,
    secret: cliclient_secret,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox' // optional - defaults to production
});

router.get('/token-for-client', async (ctx, next) => {
    if (!access_token) {
        let resp = await client.auth.client();
        access_token = resp.access_token;
    }
    ctx.body = access_token;
})

module.exports = router;