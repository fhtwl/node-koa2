const catchError = async (ctx,next)=> {
    try {
        await next()
    }
    catch (error) {
        // 需要返回的信息
        // HTTP Status Code 
        // message
        // error_code 详细错误，开发者自己定义
        // 错误类型：已知错误、未知错误
        
        let isHttpException = error instanceof global.errors.HttpException
        let isDev = global.config.environment === 'dev'

        if(isDev && !isHttpException) {//已知异常
            if(global.config.environment === 'dev') {
                throw error
            }
            
        }
        else if(!isDev && !isHttpException) {
            ctx.body = {
                msg:'未知错误',
                errorCode: 9999,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
        if(isHttpException) {
            ctx.body = {
                msg: error.message,
                errorCode: error.errorCode,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
        
    }
}

module.exports = catchError