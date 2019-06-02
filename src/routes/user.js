const Router = require('koa-router')
const router = new Router();

let db = require(path.resolve('src', 'models/index'));
let uuid4 = require('uuid/v4');
let validator = require('validator');

router.post('/signup', async (ctx, next) => {
    let { username, email, first_name, last_name, cell_phone } = ctx.request.body;
    ctx.assert(validator.isEmail(email), 400, 'Invalid Email Address');
    let required_fields = !username || !email;
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

module.exports = router;