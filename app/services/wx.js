const util = require('util')
const { default: Axios } = require('axios')
const { User } = require('../models/User')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WxManager {
    static async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl,global.config.wx.appId,global.config.wx.appSecret,code)
        const result = await Axios.get(url)
        if(result.status !== 200) {
            throw new global.errors.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        if(errcode && errcode !== 0) {
            throw new global.errors.AuthFailed('openid获取失败：'+errcode)
        }
        let user = await User.getUserByOpenid(result.data.openid)
        if(!user) {
            user = await User.registerByOpenid(result.data.openid)
        }
        let token = generateToken(user.id,Auth.USER)
        return token 
    }
}

module.exports = WxManager
