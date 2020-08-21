const Router = require("koa-router");
const { Collection } = require('../../models/collection')
const { setCollectionValidator } = require('../../validtors/validtor')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix:'/app/api/v1/collection'
})

/*
 * 新增收藏、取消收藏接口
 * @param { string } type 1 or 2,1表示新增，2表示取消
 * @param { string } token ，获取userId，type为1时必填
 * @param { string } poetryId ,诗id，type为1时必填
 * @param { string } author ，作者id，type为1时必填
 * @param { string } collectionId ，收藏id ，type为2时必填
 * @return { Boolean } success:true  成功返回success：true
 */
router.get('/poetry',async (ctx,next)=> {
    let v = await new setCollectionValidator().validate(ctx)
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
        success: true,
        id: poetry.id
    }
})

/*
 * 查询用户收藏接口
 * @param { string } token ，获取userId，type为1时必填
 * @param { string } poetryId ,诗id，type为1时必填
 * @param { string } currentPage ，分页 页码
 * @param { string } limit ，分页 每页显示数量
 * @return { Array } 返回查询到的数组
 */
router.get('/queryCollectionList',async (ctx,next)=> {
    // let v = await new setCollectionValidator().validate(ctx)
    const query = ctx.request.query
    let token = query.token
    let currentPage = Number(query.currentPage)
    let limit = Number(query.limit)
    let userId = await Auth.getUserId(token)
    let collectionList = await Collection.queryCollectionList(currentPage,limit,userId)
    ctx.body = {
        data: collectionList,
        success: true
    }
})


module.exports = router