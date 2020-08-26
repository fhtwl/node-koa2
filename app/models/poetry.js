const {Sequelize,Model} = require('sequelize')
const bcrypt = require("bcryptjs")
const {sequelize} = require('../../core/db')
const { PoetryAuthor } = require('./PoetryAuthor')
const { Collection } = require('./collection')
// Poetry.belongsTo(PoetryAuthor,{foreignKey:'author_id',targetKey: 'id'});

class Poetry extends Model {
    // 查询符合条件的诗的数组
    static async queryPoetryList(keyword,_keyword,currentPage,limit,userId,searchType) {
        const Op = Sequelize.Op
        let offset = (currentPage - 1) * 10
        let where = ''
        switch(searchType.type) {
            case 'all':
                where = `p.title LIKE '%${keyword}%' 
                        OR p.content LIKE '%${keyword}%'
                        OR a.NAME LIKE '%${_keyword}%'` 
                break;
            case 'author':
                where = `a.NAME LIKE '%${_keyword}%'`
                break;
            case 'title':
                where = `p.title LIKE '%${keyword}%`
            case 'content':
                where = `p.content LIKE '%${keyword}%`
        }
        let query = userId ?  `SELECT
                                    * 
                                FROM
                                    (
                                    SELECT
                                        p.*,
                                        c.id AS collection_id 
                                    FROM
                                        poetry AS p
                                        LEFT JOIN collection AS c ON p.id = c.poetry_id
                                        LEFT JOIN poetry_author AS a ON p.author_id = a.id 
                                        AND c.user_id = ${userId} 
                                    WHERE
                                        ${where}  UNION ALL
                                    SELECT
                                        p.*,
                                        c.id AS collection_id 
                                    FROM
                                        poetry AS p
                                        LEFT JOIN collection AS c ON p.id = c.poetry_id
                                        LEFT JOIN poetry_author AS a ON p.author_id = a.id 
                                    WHERE
                                        ${where}
                                    ) t 
                                    LIMIT ${offset},
                                    ${limit};`
                                :
                                `SELECT
                                    p.*,
                                    c.id AS collection_id 
                                FROM
                                    poetry AS p
                                    LEFT JOIN collection AS c ON p.id = c.poetry_id
                                    LEFT JOIN poetry_author AS a ON p.author_id = a.id 
                                WHERE
                                    ${where}
                                LIMIT ${offset},
                                ${limit};`;
        const [results, metadata]= await sequelize.query(query)
        if(!results) {
            throw new global.errors.QueryFailed('并无匹配的唐诗')
        }
        // let count = 0 
        let data = results
        // if(resultCount.length > 0) {
        //     count = resultCount[0]['FOUND_ROWS()']
        // } 
        return {
            data,
            // count
        }
    }

    // 获取确定的某个诗的详情
    static async getPoetryInfo(poetryId) {
        let query = `SELECT
                    p.*,
                    a.intro
                FROM
                    poetry as p 
                    LEFT JOIN poetry_author as a on p.author_id = a.id
                WHERE
                    p.id = '${poetryId}'`;
        const [results, metadata]= await sequelize.query(query)
        if(!results) {
            throw new global.errors.QueryFailed('并无匹配的唐诗')
        }  
        return results
    }

    // 获取随机单个诗
    static async getRecommendInfo(userId) {
        let query = userId ? `
        SELECT
            z.*,
            c.id AS collection_id 
        FROM
            (
            SELECT
                p.* 
            FROM
                poetry AS p
                JOIN ( SELECT ROUND( RAND( ) * ( SELECT MAX( id ) FROM poetry_author AS a ) ) AS id ) AS a 
            WHERE
                p.id > a.id 
            ORDER BY
                p.id 
                LIMIT 1 
            ) z
            LEFT JOIN collection AS c ON z.id = c.poetry_id 
            AND c.user_id = ${userId}`:
        `
        SELECT
            z.*,
            c.id AS collection_id 
        FROM
            (
            SELECT
                p.* 
            FROM
                poetry AS p
                JOIN ( SELECT ROUND( RAND( ) * ( SELECT MAX( id ) FROM poetry_author AS a ) ) AS id ) AS a 
            WHERE
                p.id > a.id 
            ORDER BY
                p.id 
                LIMIT 1 
            ) z
            LEFT JOIN collection AS c ON z.id = c.poetry_id `
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
