const {Sequelize,Model} = require('sequelize')
const bcrypt = require("bcryptjs")
const {sequelize} = require('../../core/db')
class User extends Model {
    // constructor() {
    //     super()
    // }
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
