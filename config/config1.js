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
const test = {
    environment: 'test',
    database: {
        dbName: 'nodejs',
        host: '106.13.202.207',
        port: '3306',
        username: 'root',
        password: 'root'
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

let config = test

config.security = { //token key 配置
    secretKey: 'abcdefg', //key
    expiresIn: 60*60*24*30 //过期时间
}
config.wx = {
    appId:'wx494fa336e358211d',
    appSecret:'5237858979272bd4ebf1e8f264ae5b16',
    loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
}

module.exports = config
// {

// }