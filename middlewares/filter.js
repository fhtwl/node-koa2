// const { Token } = require('../app/models/token')

const filter = async function (token) {
    const { Token } = require('../app/models/Token')
    const res = await Token.verifyToken(token) 
    return res
}

module.exports = {
    filter
}