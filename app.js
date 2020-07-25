const Koa = require('koa');

const app = new Koa();
const parser = require('koa-bodyparser')

// require('./app/models/user')


const catchError = require('./middlewares/exception')
app.use(catchError)
app.use(parser())

const InitManager = require('./core/init')
InitManager.initCore(app)
app.listen(3000,()=>{
    console.log('app started at port 3000...')
})

