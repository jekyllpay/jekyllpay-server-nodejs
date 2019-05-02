const Router = require('koa-router')
const router = new Router();
const axios = require('axios');

let access_token = null;

let client_id = process.env.DWOLLA_CLIENT_ID;
let cliclient_secret = process.env.DWOLLA_CLIENT_SECRET;

async function getAccessToken(id, secret) {
    let url = process.env.DWOLLA_BASE_URL + '/token';
    let base64_coded_auth_value = Buffer.from(`${id}:${secret}`).toString('base64');
    let resp = null;
    let err = null;
    try {
        resp = await axios.request({
            url: url,
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + base64_coded_auth_value
            },
            data: { "grant_type": "client_credentials" }
        });
    } catch (error) {
        err = error.response;
    }

    return { err, resp };
}

router.get('/token-for-client-app', async (ctx, next) => {

})

module.exports = router;