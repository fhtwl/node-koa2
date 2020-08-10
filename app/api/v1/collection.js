const Router = require("koa-router");
const { Collection } = require('../../models/collection')
const { setCollectionValidator } = require('../../validtors/validtor')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix:'/app/api/v1/collection'
})

router.get('/poetry',async (ctx,next)=> {
    let v = await new setCollectionValidator()
    const query = ctx.request.query
    let type = String(query.type)
    let poetryId = query.poetryId
    let token = query.token
    let userId = await Auth.getUserId(token)
    let authorId = query.authorId
    let collectionId = query.collectionId
    let poetry
    switch(type) {
        case '1': // 新增
            poetry = await Collection.addCollection(poetryId,userId,authorId)
            break
        case '2': // 移除
            poetry = await Collection.destroyCollection(collectionId)
            break
        default:
            throw new global.errors.ParameterException('没有相应的处理函数')
    }    
    ctx.body = {
        success: true
    }
})

module.exports = router