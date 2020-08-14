const Router = require("koa-router");
const { Poetry } = require('../../models/poetry')
const { PoetryAuthor } = require('../../models/PoetryAuthor')
const {SearchValidator} = require('../../validtors/validtor')
const { Auth } = require('../../../middlewares/auth')
const { s2t,t2s } = require('../../../core/utils')

// Poetry.hasOne(PoetryAuthor,{
//     foreignKey: 'id'
// });
// Poetry.belongsTo(PoetryAuthor,{
//     foreignKey: 'author_id'
// });
// console.log(Poetry.belongsTo)

// const init = async ()=> {
//     // Poetry.PoetryAuthor = Poetry.belongsTo(PoetryAuthor);
//     PoetryAuthor.Poetry = Poetry.hasOne(PoetryAuthor,{
//         foreignKey: 'id'
//     });
//     Poetry.PoetryAuthor = Poetry.belongsTo(PoetryAuthor,{
//         foreignKey: 'author_id'
//     });
//     // const tasks = await PoetryAuthor.findAll({ include: Poetry });
//     // console.log(JSON.stringify(tasks, null, 2));
// }
// init()

const router = new Router({
    prefix:'/app/api/v1'
})

/*
 * 搜索作者/标题/诗文关键字获取符合条件的诗的列表
 * @param { string } token ，获取userId，type为1时必填
 * @param { string } poetryId ,诗id，type为1时必填
 * @param { string } currentPage ，分页 页码
 * @param { string } limit ，分页 每页显示数量
 * @return { Array } 查询到的数据的数组
 */
router.get('/search',async (ctx,next)=> {
    let v = await new SearchValidator().validate(ctx)
    const query = ctx.request.query
    let keyword = s2t(query.keyword) //将简体关键字替换为繁体
    let currentPage = Number(query.currentPage)
    let limit = Number(query.limit)
    let token = query.token || ''
    let userId
    if(token) {
        userId = await Auth.getUserId(token)
    }
    let poetry = await Poetry.queryPoetryList(keyword,currentPage,limit,userId)
    
    ctx.body = {
        data: poetry,
        success:true
    }
})

/*
 * 查询诗详情
 * @param { string } poetryId ,诗id
 * @return { Object } 返回诗的详情和诗作者详情
 */
router.get('/search/getPoetryInfo',async (ctx,next)=> {
    let v = await new SearchValidator()
    const query = ctx.request.query
    let poetryId = query.poetryId
    let poetry = await Poetry.getPoetryInfo(poetryId)
    
    ctx.body = {
        data: poetry,
        success:true
    }
})

module.exports = router