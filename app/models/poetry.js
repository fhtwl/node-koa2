const {Sequelize,Model} = require('sequelize')
const bcrypt = require("bcryptjs")
const {sequelize} = require('../../core/db')
const { PoetryAuthor } = require('./PoetryAuthor')
const { Collection } = require('./collection')
// Poetry.belongsTo(PoetryAuthor,{foreignKey:'author_id',targetKey: 'id'});

class Poetry extends Model {
    static async queryPoetryList(keyword,currentPage,limit,userId) {
        const Op = Sequelize.Op
        let offset = (currentPage - 1) * 10
        let query = userId ?  `SELECT
                                p.*,
                                c.id as collection_id
                            FROM
                                poetry as p 
                                LEFT JOIN collection as c on p.id = c.poetry_id and c.user_id = ${userId}
                            WHERE
                                p.title LIKE '%${keyword}%' 
                                OR p.content LIKE '%${keyword}%'
                            ORDER BY p.id 
                            LIMIT ${offset},
                                ${limit};`
                                :
                                `SELECT
                                p.*
                            FROM
                                poetry as p
                            WHERE
                                p.title LIKE '%${keyword}%' 
                                OR p.content LIKE '%${keyword}%' 
                            ORDER BY p.id
                            LIMIT ${offset},
                                ${limit};`;
        const [results, metadata]= await sequelize.query(query)
        // const results = await Poetry.findAll({
        //     include: [
        //         {
        //             model: PoetryAuthor,
        //             // as: 'id',
        //             attributes: [ 'name', ['intro','introduction']],
        //             // where: {               
        //             //     id: '1'
        //             // },
                    
        //         },
        //         {
        //             model: Collection,
        //             // as: 'id',
        //             where: {               
        //                 id: userId
        //             }, 
                    
        //         }
        //     ],
        //     where: {               
        //         [Op.or]: [
        //             {
        //                 title: {
        //                     [Op.like]: `%${keyword}%`
        //                 }
        //             },
        //             {
        //                 content: {
        //                     [Op.like]: `%${keyword}%`
        //                 }
        //             }
        //         ]
        //     },
        //     limit,
        //     offset
        // })
        if(!results) {
            throw new global.errors.QueryFailed('并无匹配的唐诗')
        }  
        return results
    }

    static async getPoetryInfo(poetryId) {
        let query = `SELECT
                    p.*,
                    a.intro
                FROM
                    poetry as p 
                    LEFT JOIN poetry_author as a on p.author_id = a.id
                WHERE
                    p.id = '${poetryId}'
                ORDER BY p.id`;
        const [results, metadata]= await sequelize.query(query)
        if(!results) {
            throw new global.errors.QueryFailed('并无匹配的唐诗')
        }  
        return results
    }
    
}

Poetry.init({
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,//主键
        autoIncrement: true//自增
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    author_id: Sequelize.STRING,
    author: Sequelize.STRING,
    dynasty: Sequelize.STRING,
    yunlv_rule: Sequelize.STRING,
},{
    sequelize,
    tableName: 'poetry'
})


function relation() {
    // PoetryAuthor.Poetry = Poetry.hasOne(PoetryAuthor,{
    //     foreignKey: 'id'
    // });
    Poetry.PoetryAuthor = Poetry.belongsTo(PoetryAuthor,{
        foreignKey: 'author_id',
        targetKey: 'id'
    });
    Poetry.Collection = Poetry.belongsTo(Collection,{
        foreignKey: 'id',
        targetKey: 'poetry_id'
    });
    // Poetry.Collection = Poetry.belongsToMany(Collection,{
    //     through: 'Poetry_Collection'
    // });
    // Collection.Poetry = Poetry.belongsToMany(Poetry,{
    //     through: 'Poetry_Collection'
    // });
}
relation()

module.exports = {
    Poetry
}
