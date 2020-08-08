const Router = require("koa-router");
const { Poetry } = require('../../models/poetry')
const { PoetryAuthor } = require('../../models/PoetryAuthor')
const {SearchValidator} = require('../../validtors/validtor')
const { Auth } = require('../../../middlewares/auth')

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

router.get('/search',async (ctx,next)=> {
    let v = await new SearchValidator()
    const query = ctx.request.query
    let keyword = query.keyword || ''
    let currentPage = Number(query.currentPage)
    let limit = Number(query.limit)
    let token = query.token || ''
    let userId
    if(token) {
        userId = await Auth.getUserId(token)
    }
    let poetry = await Poetry.queryPoetryList(keyword,currentPage,limit,userId)
    
    ctx.body = {
        data: poetry
    }
})

module.exports = router