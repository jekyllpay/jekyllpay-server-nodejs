const UNIONPAY_ACCOUNT_KEY = process.env.UNIONPAY_ACCOUNT_KEY;

let up_gateway_apis = {
    getAtmCountry: `https://developer.unionpayintl.com/proxy/ovsATMt/accqCountrMsg/${UNIONPAY_ACCOUNT_KEY}/getCountry`,
    getATMList: `https://developer.unionpayintl.com/proxy/ovsATMt/accqATMmsg/${UNIONPAY_ACCOUNT_KEY}/getATMList`,
    getATMInstitution: `https://developer.unionpayintl.com/proxy/ovsATMt/accqBankMsg/${UNIONPAY_ACCOUNT_KEY}/getInstitution`
}


module.exports = up_gateway_apis;