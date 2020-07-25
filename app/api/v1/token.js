const Router = require('koa-router')
const {TokenValidator} = require('../../validtors/validtor')
const {LoginType} = require('../../lib/enum')
const { User } = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')


const router = new Router({
    prefix: '/app/api/v1/token'
})

router.post('/', async (ctx,next)=> {
    const v = await new TokenValidator().validate(ctx)
    const query = ctx.request.query
    let type = Number(query.type)
    let token;
    switch(type) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(query.account,query.secret)
            break
        case LoginType.USER_MINI_PROGRAM:
            // await emailLogin()
            break
        case LoginType.ADMIN_EMAIL:
            break
        default:
            throw new global.errors.ParameterException('没有相应的处理函数')
        }
    ctx.body = {
        token
    }
})

// email登录
async function emailLogin(account,secret) {
    const user= await User.verifyEmailPassword(account,secret);
    return token = generateToken(user.id, Auth.USER)
}

module.exports = router