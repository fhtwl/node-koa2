const Router = require("koa-router");
const { User } = require('../../models/User')
const multer = require('koa-multer');

//配置    
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')  //注意路径必须存在
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({ storage: storage })


const router = new Router({
    prefix:'/app/api/v1/upload'
})

/*
 * 上传文件
 * @param { string } token ，获取userId
 * @return { string } id ,返回图片的id
 */
router.post('/add',upload.single('face'),async (ctx,next)=> {
    // let v = await new userInfoValidator().validate(ctx)
    const query = ctx.request.query
    let token = query.token
    let file = ctx.req.file
    // let userId = await Auth.getUserId(token)
    // ctx.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
    ctx.body = {
        id: ctx.req.file.filename,
        success:true
    }
})

module.exports = router