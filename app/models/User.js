const {Sequelize,Model} = require('sequelize')
const bcrypt = require("bcryptjs")
const {sequelize} = require('../../core/db')

class User extends Model {
    static async verifyEmailPassword(email,plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if(!user) {
            throw new global.errors.AuthFailed('账号不存在')
        }  
        const correct = bcrypt.compareSync(plainPassword,user.password)
        if(!correct) {
            throw new global.errors.AuthFailed('密码不正确')
        }
        return user
    }

    // 查询openid
    static async getUserByOpenid(openid) {
        const user = User.findOne({
            where: {
                open_id:openid
            }
        })
        return user
    }
    // 注册openid
    static async registerByOpenid(openid) {
        var nickName= '用户_' + new Date().getTime().toString() + 'c' + Math.round(Math.random() * 10000).toString()
        const user = {
            openId:openid,
            nickName,
        }
        return await User.create(user)
    }

    // 获取用户详情等信息
    static async getUserInfo(id) {
        const user = {
            id
        }
        const [results, metadata]= await sequelize.query(
            `SELECT
                id,nick_name,email,test,info
            FROM
                user as u 
            WHERE
                u.id = '${id}'`
        )
        if(results.length > 0) {
            results[0].info = results[0].info || {avatar:''}
            return results[0]
        }
        else {
            throw new global.errors.AuthFailed('账号不存在')
        }
    }

     // 保存用户信息
     static async setUserInfo(userId,info) {
        const [results, metadata]= await sequelize.query(
            `UPDATE
                user
            SET
                info = '${info}'
            WHERE
                id = '${userId}'`
        )
        if(results.serverStatus = 2) {
            return '保存成功'
        }
        else {
            throw new global.errors.AuthFailed('修改失败')
        }
    }
}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,//主键
        autoIncrement:true//自增
    },
    nickName:Sequelize.STRING,
    email:{
        type:Sequelize.STRING(128),
        unique:true //唯一
    },
    password:{
        type:Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val,salt)
            this.setDataValue('password',psw)
        }
    },
    openId:{
        type:Sequelize.STRING(64),
        unique:true //唯一
    },
    test:Sequelize.STRING,
    info:Sequelize.STRING,
},{
    sequelize,
    tableName: 'user'
})
module.exports = {
    User
}
