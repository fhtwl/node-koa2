const Router = require("koa-router");
const bcrypt = require("bcryptjs")
const {RegisterValidator} = require('../../validtors/validtor')
const {User} = require('../../models/user');
const { Success } = require("../../../core/http-exception");
// const {success} = require("../../lib/helper")
const router = new Router({
    prefix:'/app/api/v1/register',//路由前缀
})

router.post('/',async (ctx,next)=> {

    const v = await new RegisterValidator().validate(ctx)
    const query = ctx.request.body
    const user = {
        email: query.email,
        password:  query.password1,
        nickName: query.nickName
    }
    console.log(user)
    let r = await User.create(user)
    
    throw new global.errors.Success()
    // success()
    // throw new Error('api exception')
})

module.exports = router