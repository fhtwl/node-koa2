const Router = require('koa-router')
const {TokenValidator,MiniTokenValidator,NotEmptyValidator} = require('../../validtors/validtor')
const {LoginType} = require('../../lib/enum')
const { User } = require('../../models/User')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const WxManager = require('../../services/wx')
const { Token } = require('../../models/Token')

const router = new Router({
    prefix: '/app/api/v1/token'
})

/*
 * 登录获取token的接口
 * @param { string } type ,100微信登录，101邮箱登录
 * @param { string } account ,邮箱, type为101时必填
 * @param { string } secret ,密码，type为101时必填
 * @param { string } code ，微信code ，type为100时必填
 * @return { string } token  成功返回token
 */
router.post('/', async (ctx,next)=> {
    let v 
    const query = ctx.request.body
    let type = Number(query.type)
    let token;
    switch(type) {
        case LoginType.USER_EMAIL: //email登录
            v = await new TokenValidator().validate(ctx)
            token = await emailLogin(query.account,query.secret)
            break
        case LoginType.USER_MINI_PROGRAM: //小程序登录
            v = await new MiniTokenValidator().validate(ctx)
            token = await wxLogin(query.code)
            break
        case LoginType.ADMIN_EMAIL: //超级管理员登录
            break
        default:
            throw new global.errors.ParameterException('没有相应的处理函数')
        }
    await Token.saveToken(token)
    ctx.body = {
        token
    }
})

/*
 * 验证token是否通过的接口
 * @param { string } token
 * @return { Boolean } true  成功返回true
 */
router.post('/verify',async (ctx,next)=> {
    const v = await new NotEmptyValidator().validate(ctx)
    const query = ctx.request.body
    const result = await Auth.verifyToken(query.token)
    ctx.body = {
        result
    }
})

/*
 * 注销登录
 * @param { string } token
 * @return { Boolean } true  成功返回true
 */
router.post('/cancellation',async (ctx,next)=> {
    const v = await new NotEmptyValidator().validate(ctx)
    const query = ctx.request.body
    const result = await Token.deleteToken(query.token)
    ctx.body = {
        success: result
    }
})


// email登录
async function emailLogin(account,secret) {
    const user= await User.verifyEmailPassword(account,secret);
    return token = generateToken(user.id, Auth.USER)
}

// 微信登录
async function wxLogin(code) {
    const token= await WxManager.codeToToken(code);
    return token
}

module.exports = router