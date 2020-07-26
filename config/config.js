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
        host: '172.16.0.8',
        port: '3306',
        username: 'root',
        password: 'Hzkj@2019'
    }
}

let config = dev

config.security = { //token key 配置
    secretKey: 'abcdefg', //key
    expiresIn: 60*60*24*30 //过期时间
}

module.exports = config
// {

// }