const {Sequelize,Model} = require('sequelize')
const bcrypt = require("bcryptjs")
const {sequelize} = require('../../core/db')
// const { Poetry } = require('./Poetry')

class Collection extends Model {
    // 查询所有收藏
    static async queryCollectionList(currentPage,limit,userId) {
        const Op = Sequelize.Op
        let offset = (currentPage - 1) * 10
        // const collection = await Collection.findAll({
        //     where: {               
        //         userId
        //     },
        //     limit,
        //     offset
        // })
        let query = `SELECT
                        c.*,
                        p.title,
                        p.content,
                        p.author
                    FROM
                        collection as c 
                       
                        LEFT JOIN poetry as p on c.poetry_id = p.id
                    WHERE
                        c.user_id = '${userId}'
                    ORDER BY c.updated_at 
                    LIMIT ${offset},
                        ${limit};`
        const [results, metadata]= await sequelize.query(query)
        return results
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
        const collection = await Collection.destroy({
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
