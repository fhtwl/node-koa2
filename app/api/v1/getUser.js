const Router = require("koa-router");
const { User } = require('../../models/User')
const { userInfoValidator } = require('../../validtors/validtor')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix:'/app/api/v1/user'
})

/*
 * 查询用户信息接口
 * @param { string } token ，获取userId
 * @return { Object } {"data":{"id":12,"nick_name":"fhtwl","email":"1121145488@qq.com","test":null,"info":{"avatar":""}},"success":true}
 */
router.get('/getUserInfo',async (ctx,next)=> {
    let v = await new userInfoValidator().validate(ctx)
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