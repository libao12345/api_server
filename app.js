const express = require('express')
const path = require('path')
const fs = require('fs')
//创建express 服务器实例对象
const app = express()

//导入 跨越模块
const cors = require('cors')
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

//托管静态文件
app.use(express.static(path.join(__dirname, './dist')));

//配置解析表单的中间件
app.use(express.urlencoded( {extended: false} ))

//定义res.msg 函数
app.use((req, res, next) => {
    //status 默认值为1，表示失败的情况
    // err 可能是一个错误对象，也可能是一个错误字符串
    res.msg = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//导入user 模块
const userRouter = require('./router/user')
app.use('/v1.0/api', userRouter)

//导入并使用患者信息路由模块
const crtCateRouter = require('./router/artcate')
app.use('/v1.0/api', crtCateRouter)


//启动服务器
app.listen(8037, () => {
    console.log('API Server running at http://127.0.0.1:8037')
})