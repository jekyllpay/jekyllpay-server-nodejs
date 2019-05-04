const Router = require('koa-router')
const router = new Router();
const dwolla = require('dwolla-v2');

let access_token = null;

let client_id = process.env.DWOLLA_CLIENT_ID;
let cliclient_secret = process.env.DWOLLA_CLIENT_SECRET;

const client = new dwolla.Client({
    key: client_id,
    secret: cliclient_secret,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox' // optional - defaults to production
});

async function getAccessToken() {
    if (!access_token) {
        let resp = await client.auth.client();
        access_token = resp.access_token;
    }
    return access_token;
}

router.get('/', async (ctx, next) => {
    ctx.body = "hello world"
})

module.exports = router;