const express = require('express')

const router = express.Router()

//导入模块
const userHandler = require('../router_handler/user')
//用户注册
router.post('/register', userHandler.registerUser)
//用户登录
router.post('/login', userHandler.login)

module.exports = router