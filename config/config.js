const dev = {
    environment: 'product',
    database: {
        dbName: 'nodejs',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '123456'
    }
}

const product = {
    environment: 'product',
    database: {
        dbName: 'nodejs',
        host: '106.13.202.207',
        port: '3306',
        username: 'root',
        password: 'root'
    }
}

let config = product

config.security = { //token key 配置
    secretKey: 'abcdefg', //key
    expiresIn: 60*60*24*30 //过期时间
}

module.exports = config
// {

// }