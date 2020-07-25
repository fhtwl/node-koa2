const Router = require("koa-router");
const router = new Router()
console.log(__dirname)
router.get('/api/v1/book/getDetails', (ctx,next)=> {
    ctx.body = {
        path: '/book/getDetails'
    }
})

module.exports = router