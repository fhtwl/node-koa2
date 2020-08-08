const Router = require("koa-router");
const { User } = require('../../models/User')
const {SearchValidator} = require('../../validtors/validtor')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix:'/app/api/v1/user'
})

router.get('/getUserInfo',async (ctx,next)=> {
    let v = await new SearchValidator()
    const query = ctx.request.query
    let token = query.token
    let userId = await Auth.getUserId(token)
    let user = await User.getUserInfo(userId)
    
    ctx.body = {
        data: user,
        success:true
    }
})

module.exports = router