const Router = require("koa-router");
const { User } = require('../../models/User')
const { userInfoValidator,setUserInfoValidator } = require('../../validtors/validtor')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix:'/app/api/v1/user'
})

/*
 * 查询用户信息接口
 * @param { String } token ，获取userId
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

/*
 * 保存用户信息
 * @param { String } token ，获取userId
 * @param { Object } info , 用户头像等信息
 * @return { Boolean } ，成功返回success：true
 */
router.post('/saveUserInfo',async (ctx,next)=> {
    let v = await new setUserInfoValidator().validate(ctx)
    const query = ctx.request.body
    let token = query.token
    let info = query.info
    let userId = await Auth.getUserId(token)
    let user = await User.setUserInfo(userId,info)
    
    ctx.body = {
        data: user,
        success:true
    }
})

module.exports = router