const {LinValidator,Rule} = require('../../core/lin-validator')
const { User } = require('../models/user')
const { LoginType } = require('../lib/enum')

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
        const email = vals.body.email
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

// token令牌 账号密码登录
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
        //    new Rule('isOptional'),
           new Rule('isLength','至少6个字符',{
                min:6,
                max:128
           })
       ]
    }
    validateLoginType(vals) {
        let type = vals.body.type
        if(!type) {
            throw new Error('type是必须参数')
        }
        if(!LoginType.isThisType(type)) {
            throw new Error('type是不合法')
        }
    } 
}

// token令牌 微信登录
class MiniTokenValidator extends LinValidator {
    constructor () {
       super()
       this.code = [
           new Rule('isLength','code不得为空',{
               min:4,
               max:128
           })
       ]
    }
    validateLoginType(vals) {
        let type = vals.body.type
        if(!type) {
            throw new Error('type是必须参数')
        }
        if(!LoginType.isThisType(type)) {
            throw new Error('type是不合法')
        }
    } 
}

// 校验token不为空 
class NotEmptyValidator extends LinValidator {
    constructor () {
        super()
        this.token = [
            new Rule('isLength','不能为空',{min:1})
        ]
    }
}

// 搜索所有诗
class SearchValidator extends LinValidator {
    constructor () {
        super()
        this.currentPage = [
            new Rule('isInt','需要是正整数',{min:1})
        ]
        this.limit = [
            new Rule('isInt','需要是正整数',{min:1})
        ]
        
    }
}

// 新增或者移除收藏校验
class setCollectionValidator extends LinValidator {
    constructor () {
        super()
        this.token = [
            new Rule('isLength','不能为空',{min:1})
        ]
        this.type = [
            new Rule('isLength','不能为空',{min:1})
        ]
    }
    validateSetCollection(vals) {
        let type = vals.body.type
        if(type == 1){
            if(poetryId && userId && authorId) {

            }
            else {
                throw new Error('poetryId、userId、authorId不得为空')
            }
        }
        if(type == 2){
            if(collectionId) {

            }
            else {
                throw new Error('collectionId不得为空')
            }
        }
    } 
}



module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    MiniTokenValidator,
    NotEmptyValidator,
    SearchValidator,
    setCollectionValidator
}