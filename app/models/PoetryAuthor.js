const {Sequelize,Model} = require('sequelize')
const bcrypt = require("bcryptjs")
const {sequelize} = require('../../core/db')

class PoetryAuthor extends Model {
    
}

PoetryAuthor.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,//主键
        autoIncrement:true//自增
    },
    name: Sequelize.STRING,
    intro: Sequelize.STRING,
    dynasty: Sequelize.STRING
},{
    sequelize,
    tableName: 'poetry_author'
})
module.exports = {
    PoetryAuthor
}
