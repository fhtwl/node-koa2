const {Sequelize,Model} = require('sequelize')
const bcrypt = require("bcryptjs")
const {sequelize} = require('../../core/db')
// const { Poetry } = require('./Poetry')

class Collection extends Model {
    // 查询所有收藏
    static async queryCollectionList(user_id,currentPage,limit) {
        const Op = Sequelize.Op
        let offset = (currentPage - 1) * 10
        const collection = await Collection.findAll({
            where: {               
                user_id
            },
            limit,
            offset
        })
        // const poetry = await Poetry.findAll({
        //     where:{
        //         author:'李白'
        //     }
        // })
        if(!collection) {
            throw new global.errors.QueryFailed('还未收藏')
        }  
        return collection
    }
    // 判断这首诗是否被收藏
    static async getCollectionStatus(poetry_id) {
        const collection = await Collection.findOne({
            where: {               
                poetry_id
            }
        })
        return collection
    }

    // 新增收藏
    static async addCollection(poetry_id,user_id,author_id) {
        const collection = await Collection.create({
            poetry_id,
            user_id,
            author_id
        })
        return collection
    }

    // 取消收藏
    static async destroyCollection(id) {
        const collection = await User.destroy({
            where: {
               id
            }
        })
        return collection
    }
    
}

Collection.init({
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,//主键
        autoIncrement: true//自增
    },
    author_id: Sequelize.STRING,
    user_id: Sequelize.STRING,
    poetry_id: Sequelize.STRING
},{
    sequelize,
    tableName: 'collection'
})

// function relation() {
//     // PoetryAuthor.Poetry = Poetry.hasOne(PoetryAuthor,{
//     //     foreignKey: 'id'
//     // });
//     Poetry.Collection = Poetry.belongsTo(Collection,{
//         foreignKey: 'poetry_id',
//         targetKey: 'id'
//     });
// }
// relation()

module.exports = {
    Collection
}
