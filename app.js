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
    console.log('\x1B[32m','run success')
    console.log('\x1B[32m',`
                                                       __----~~~~~~~~~~~------___
                                      .  .   ~~//====......          __--~ ~~
                      -.            \_|//     |||\\  ~~~~~~::::... /~
                   ___-==_       _-~o~  \/    |||  \\            _/~~-
           __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
       _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
     .~       .~       |   \\ -_    /  /-   /   ||      \   /
    /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
    |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
             '         ~-|      /|    |-~\~~       __--~~
                         |-~~-_/ |    |   ~\_   _-~            /\
                              /  \     \__   \/~                \__
                          _--~ _/ | .-~~____--~-/                  ~~==.
                         ((->/~   '.|||' -_|    ~~-/ ,              . _||
                                    -_     ~\      ~~---l__i__i__i--~~_/
                                     _-~-__   ~)  \--______________--~~
                                   //.-~~~-~_--~- |-------~~~~~~~~
                                          //.-~~~--\
                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~      
    `)
    console.log('\x1B[34m','app started at port 3000...')
})

