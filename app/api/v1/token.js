const Router = require('koa-router')
const {TokenValidator} = require('../../validtors/validtor')
const {LoginType} = require('../../lib/enum')
const router = new Router({
    prefix: '/app/api/v1/token'
})

router.post('/', async (ctx,next)=> {
    const v = await new TokenValidator().validate(ctx)
    const query = ctx.request.query
    let type = query.type
    switch(type) {
        case LoginType.USER_EMAIL:
            break
            query
    }
})
