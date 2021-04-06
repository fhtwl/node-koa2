const {Sequelize,Model} = require('sequelize')
const bcrypt = require("bcryptjs")
const {sequelize} = require('../../core/db')

class Token extends Model {
    // 验证token是否合法
    static async verifyToken(token) {
        const [results, metadata]= await sequelize.query(
            `SELECT
                token,created_at
            FROM
                token
            WHERE
                token = '${token}'`
        )
        if(results.length <= 0) {
            throw new global.errors.LoginExpired()
        }  
        return true
    }

    // 保存token
    static async saveToken(token) {
        // const [results, metadata]= await sequelize.query(
        //     `INSERT INFO 
        //         token (token,created_at)
        //     VALUES (${token},${created_at})`
        // )
        const res = await Token.create({
            token
        })
        return true
    }

    // 删除token
    static async deleteToken(token) {
        // const [results, metadata]= await sequelize.query(
        //     `INSERT INFO 
        //         token (token,created_at)
        //     VALUES (${token},${created_at})`
        // )
        let query = `
                        DELETE FROM token
                        WHERE 
                            token = '${token}'
                    `
        const [results, metadata] = await sequelize.query(query)
        return true
    }


}

Token.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,//主键
        autoIncrement:true//自增
    },
    token:Sequelize.STRING
},{
    sequelize,
    tableName: 'token'
})
module.exports = {
    Token
}
