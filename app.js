const Koa = require('koa');

const app = new Koa();
const parser = require('koa-bodyparser')

// require('./app/models/user')

const catchError = require('./middlewares/exception')

app.use(catchError)
app.use(parser())

app.use(async (ctx, next) => {
    // 拦截有token的请求，判断请求是否过期
    let params =Object.assign({}, ctx.request.query, ctx.request.body);
    const { filter } = require('./middlewares/filter')
    if(params.token) {
      let bool = await filter(params.token)
    }
    // ctx.request.header = {'authorization': "Bearer " + (params.token || '')}
    await next();
})

const InitManager = require('./core/init')
InitManager.initCore(app)

app.listen(3000,()=>{
    console.log('\x1B[32m','run success')
    console.log('\x1B[34m','app started at port 3000...')
})

