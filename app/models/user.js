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
    test:Sequelize.STRING
},{
    sequelize,
    tableName: 'user'
})
module.exports = {
    User
}
