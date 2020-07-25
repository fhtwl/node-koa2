const Router = require("koa-router");
const router = new Router({
    prefix:'/app/api/v1/classic'
})
const {PositiveIntegerValidator} = require('../../validtors/validtor');
const { Auth } = require("../../../middlewares/auth");

const lever = 8 //访问该接口需要的权限等级

router.get('/:id',new Auth(lever).m,async (ctx,next)=> {
    // const path = ctx.params;
    // const query = ctx.request.query;
    // const headers = ctx.request.header
    // const body = ctx.request.body
    // if(!query.token) {
    //     // covnst error = new Error('error的msg')
    //     // error.errorCode = 1001
    //     // error.requestUrl = `${ctx.method} ${ctx.path}`
    //     // error.status = 400

    //     // const error = new HttpException('请求失败',10001,401) 
    //     const error = new global.errors.ParameterException()
    //     throw error
    // }
    // const error = new HttpException(v)

    const v = await new PositiveIntegerValidator().validate(ctx)
    const id = v.get('path.id',parsed=false) //校验器回根据校验条件自动转换数据，如isInt会将字符串转换为数字。parsed是否需要转换数据格式，parsed=false获取原始数据
    const data = v.get('body.data.data',parsed=false) //parsed是否需要转换数据格式，parsed=false获取原始数据

    const uid = ctx.auth.uid
    ctx.body = {
        path: `/classic/${id}... \n uid:${uid} `
    }
    // throw new Error('api exception')
})

module.exports = router