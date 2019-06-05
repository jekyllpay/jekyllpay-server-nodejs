const api_key = process.env.MAILGUN_KEY;
const domain = process.env.MAILGUN_DOMAIN;

const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });


module.exports = mailgun;