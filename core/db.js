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
    logging:true,//是否显示sql
    timezone:'+08:00',
    dialect: 'mysql',
    define: {
        timestamps:true, //时间戳，启用该配置后会自动添加createdAt、updatedAt两个字段，分别表示创建和更新时间
        paranoid:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        underscored:true, //自动添加的字段使用下划线，如：createdAt在数据库中的字段名会是created_at
        // deletedAt:'deleted_at',
        paranoid: false //虚拟删除，启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
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