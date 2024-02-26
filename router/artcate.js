//患者信息 的路由模块
const express =  require('express')

const router = express.Router()
//数据验证中间件
const expressJoi = require('@escook/express-joi')

//导入需要验证的规则对象
const {get_cate_schema, update_cateid_schema} = require('../schena/artcate')

//导入患者信息的路由处理模块
const artCate_handler = require('../router_handler/artcate')


//获取患者信息数据的路由
router.get('/cates', artCate_handler.getArtCates)
//通过患者姓名或者身份证号获取建档信息路由
router.get('/catesinfo',  artCate_handler.getArtCatesByname)
//根据 id 更新患者建档信息
router.post('/updatecate', expressJoi(update_cateid_schema),artCate_handler.updateArtCatesById)

module.exports = router