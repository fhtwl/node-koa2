const dev = {
    environment: 'dev',
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
        host: 'cdb-9eux2gx9.gz.tencentcdb.com',
        port: '10132',
        username: 'root',
        password: 'Hzkj@2019'
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