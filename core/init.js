const requireDirectory = require('require-directory');
const Router = require("koa-router");
class InitManager {
    static initCore(app) {
        // 入口方法
        InitManager.app = app
        InitManager.InitLoadRouters()
        InitManager.LoadHttpException()
        InitManager.LoadConfig()
    }
    // 加载http接口
    static InitLoadRouters() {
        const modules = requireDirectory(module,`${process.cwd()}/app/api`,{
            visit:whenLoadModule
        })
        
        async function whenLoadModule(obj) {
            if(obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
    // 加载http错误监听
    static LoadHttpException () {
        const errors = require('./http-exception')
        global.errors = errors
    }
    // 加载配置文件
    static LoadConfig () {
        const config = require('../config/config')
        // console.log(process.cwd())
        global.config = config
    }
}
module.exports = InitManager