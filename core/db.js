const Sequelize = require('sequelize')

const {
    dbName,
    host,
    port,
    username,
    password,
} = require('../config/config').database;

const sequelize = new Sequelize(dbName,username,password,{
    host,
    port,
    logging:()=> {
        return true
    },//是否显示sql
    timezone:'+08:00',
    dialect: 'mysql',
    define: {
        timestamps:true,
        paranoid:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        underscored:true
    },
    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 10000
    // }
})

// sequelize.sync({
//     force:true //可以直接更新数据库表的结构
// })

module.exports = {
    sequelize
}