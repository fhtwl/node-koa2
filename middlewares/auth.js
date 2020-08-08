const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(lever) {
        this.lever = lever || 8
        Auth.USER = 8
        Auth.VIP = 16
        Auth.ADMIN = 99
    }
    get m() {
        return async (ctx,next)=> {
            //检测token是否合法
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不合法'
            if(!userToken || !userToken.name) {
                throw new global.errors.Forbbiden()
            }
            try {
                var decode = jwt.verify(userToken.name,global.config.security.secretKey)
            } 
            catch(error) {
                if(error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }  
                throw new global.errors.Forbbiden(errMsg) 
            }
            if(decode.scope < this.lever) {
                errMsg = '权限不足'
                throw new global.errors.Forbbiden(errMsg)
            }
            // 保存uid和scope
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next()
        }
    }
    static verifyToken(token) {
        try {
            jwt.verify(token,global.config.security.secretKey)
            return true
        }
        catch(error) {
            return false
        }
    }
    static getUserId(token) {
        const data = jwt.decode(token,global.config.security.secretKey)
        if(!data.uid) {
            errMsg = 'token已过期'
            throw new global.errors.Forbbiden(errMsg)    
        }
        else {
            return data.uid
        }
        
    }
    
}

module.exports = {
    Auth
}