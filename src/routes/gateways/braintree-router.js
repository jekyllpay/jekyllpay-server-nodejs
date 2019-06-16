const Router = require('koa-router')
const router = new Router();
const path = require('path');
const braintree = require('braintree');
let braintree_gateway = require(path.resolve('src', 'models/gateways/braintree'));

function formatErrors(errors) {
    let formattedErrors = '';
  
    for (let i in errors) { // eslint-disable-line no-inner-declarations, vars-on-top
      if (errors.hasOwnProperty(i)) {
        formattedErrors += 'Error: ' + errors[i].code + ': ' + errors[i].message + '\n';
      }
    }
  
    return formattedErrors;
}

router.all('/', (ctx, next) => {
    ctx.status = 403;
    ctx.body = {
        message: 'Not Authorized!',
        data: null
    }
});

router.get('/client_token', async (ctx,next)=>{
    let resp;
    try{
        resp = await gateway.clientToken.generate();
    }
    catch(err){
        ctx.throw(400, 'Bad Request: ' + err)
    }
    ctx.status = 200;
    ctx.body = {
        message:'Token Generated',
        data: {
            client_token: resp.clientToken
        }
    }
})

router.post('/checkouts', async (ctx, next) => {
    let amount = ctx.request.body.amount; 
    let  nonce = ctx.request.body.payment_method_nonce;
    let result;
    try {
        result = await braintree_gateway.transaction.sale({
                amount: amount,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true
                }
            });
    }catch(err){
        ctx.throw(400, 'Bad Request: ' + err)
    }
    
    if (result.success || result.transaction) {
        ctx.status = 200;
        ctx.body = {
            message: 'Success',
            data: {
                transaction:result.transaction.id
            }
        }            
      } else {
        let transactionErrors = result.errors.deepErrors();
        ctx.status = 400;
        ctx.body = {
            message:'Bad Request: ' + formatErrors(transactionErrors),
            data: null
        }
      }    
});


module.exports = router;