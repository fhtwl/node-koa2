const {LinValidator,Rule} = require('../../core/lin-validator')
const { User } = require('../models/user')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [ //如果定义多个，多个条件之间是且关系&&
            new Rule('isInt','需要是正整数',{min:1}) //判断正整数
        ]
    }
}

// 注册校验
class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [ //如果定义多个，多个条件之间是且关系&&
            new Rule('isEmail','不符合密码规范') 
        ]
        this.password1 = [
            new Rule('isLength','密码至少需要6个字符，最多32个字符',{
                min:6,
                max:32
            }),
            new Rule('matches','密码应由数字、大写字母、小写字符、特殊符号组成','^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,30}$')
        ]
        this.password2 = this.password1
        this.nickName = [
            new Rule('isLength','昵称至少需要4个字符，最多32个字符',{
                min:4,
                max:32
            }), 
        ]
    }
    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if(psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }
    async validateEmail(vals) {
        const email = vals.query.email
        const user = await User.findOne({
            where: {
                email:email
            }
        })
        if(user) {
            throw new Error('email已被注册')
        }
    }
}

// token令牌
class TokenValidator extends LinValidator {
    constructor () {
       super()
       this.account = [
           new Rule('isLength','不符合账号规则',{
               min:4,
               max:32
           })
       ]
       this.secret = [
           new Rule('isOptional'),
           new Rule('isLength','至少6个字符',{
                min:6,
                max:128
           })
       ]
    }
    validateLoginType(vals) {

    } 
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator
}