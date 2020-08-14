// const { Token } = require('../app/models/token')

const filter = async function (token) {
    const { Token } = require('../app/models/token')
    const res = await Token.verifyToken(token) 
    return res
}

module.exports = {
    filter
}