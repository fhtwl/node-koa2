const Router = require("koa-router");
const router = new Router()
console.log(__dirname)
router.get('/app/api/v1/book', (ctx,next)=> {
    ctx.body = {
        path: '/book'
    }
})

module.exports = router