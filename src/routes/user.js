const Router = require('koa-router')
const router = new Router({prefix:'/user'});
const path = require('path');
const crypto =require('crypto');

let db = require(path.resolve('src', 'models/index'));

let uuid4 = require('uuid/v4');
let validator = require('validator');

const mailgun = require(path.resolve('src', 'common/libs/email') );
const redis = require(path.resolve('src', 'common/libs/redis') );

router.post('/signup', async (ctx, next) => {
    let { username, email, first_name, last_name, cell_phone } = ctx.request.body;
    ctx.assert(validator.isEmail(email), 400, 'Invalid Email Address');
    let required_fields = !!username && !!email;
    ctx.assert(required_fields, 400, 'Username and Email are required');
    let user;
    try{
        user = await db.User.create({
            uuid: uuid4(),
            username: username,
            email: email,
            password: null,
            is_verified: false,
            created_at: parseInt(Date.now() / 1000, 10), // 10-digit timestamp
            first_name: first_name,
            last_name: last_name,
            cell_phone: cell_phone
        });
    }
    catch (err){
        ctx.throw(400, 'Bad Request')
    }
    ctx.status = 201;
    ctx.body = {
        message: 'Welcome to Jekyll Pay!',
        data: { 
            user : { 
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                cell_phone: user.cell_phone
            } 
        }
    }
});


router.post('/verify', async (ctx, next)=>{
    let { email, username } = ctx.request.body;
    let user = await db.User.findOne({where: { email: email,  username: username}});
    ctx.assert(user, 400, 'Bad Request');
    if (user.is_verified){
        ctx.status = 200;
        ctx.body = { message: "Already Verified!", data: { user: { email:user.email } }};
    }else{
        
        //send an email
        try {
            await mailgun.messages().send({
                from: 'Jekyll Pay Message Center <noreply@msg.jekyllpay.com>',
                to: user.email,
                subject: 'Jekyll Pay User Verify Link',
                text: 'Click the link:\n\nhttps://api.jekyllpay.com/user/verify?email='
                + user.email
                + '&code=' +  crypto.createHash('md5').update(process.env.USER_VERIFY_KEY + user.email + user.username).digest('hex')
                + '&deadline=' + (Date.now() + 30 * 86400 * 1000)
            });
        } catch (err) {
            ctx.throw(500, 'Internal Server Error' + err);
        }

        //send email first, and then, incr email_key
        let email_key = "jp:send:" + user.email;
        let sent = await redis.get(email_key);
        if(!sent){
            await redis.set(email_key, 1 , 'EX', 86400);
        }else if ( sent < 5){
            await redis.incr(email_key);
        }else{
            ctx.throw(429,'Exceed Rate Limit.');
        }

        ctx.status = 200;
        ctx.body = {  message: 'Verification Email Sent!' }
    }
});

router.get('/verify', async(ctx, next) =>{
    let { email,  code, deadline } = ctx.request.query;
    ctx.assert(!!email && !!code && !!deadline, 400, 'Invalid Verification Link');
    ctx.assert(Date.now() < deadline, 400, 'Verification Link has expired!');
    let user = await db.User.findOne({where: {email:email}});
    ctx.assert(user, 400, 'Bad Request');
    if (user.is_verified){
        ctx.status = 200;
        ctx.body = { message: "Already Verified!", data: { user: { email:user.email } }}
    }
    else if ( !user.is_verified && code == crypto.createHash('md5').update(process.env.USER_VERIFY_KEY + user.email + user.username).digest('hex')){
        user.is_verified = true;
        await user.save();
        ctx.status = 200;
        ctx.body = { message: 'User Verified!', data: { user : {email: user.email, username: user.username}}};
    }else{
        ctx.status = 400;
        ctx.body = { message :"Invalid Verification Link"}
    }
    
})

module.exports = router;