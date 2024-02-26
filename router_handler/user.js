//导入数据库操作模块
const db = require('../db/index')
const oracledb = require('oracledb')

const express = require('express')

//用户注册
exports.registerUser = async (req, res) => {
    const userInfo = req.body
    // console.log('req.body: ', req.body);
    if(!userInfo.username || !userInfo.password) return res.send({
        status: 1,
        message: '用户名或密码不合法'
    })
    //定义sql语句，查询用户是否被占用
    const sqlSstr = 'Select * from tauser Where loginid = :loginid'
    db.runQuery(sqlSstr, [userInfo.username]).then(rows => {
        // console.log('rows: ' + rows)
        // console.log(`返回的数据：${rows.length}行`)
        
        if(rows.length > 0) {
            /* return res.send({
                status: 0,
                message: '用户已存在'
            }) */
            return res.msg('用户已存在')
        }
        // res.send('register OK')
        res.msg('注册成功', 0)
    })

}

//用户登录
exports.login = (req, res) => {
    res.send('login OK')
}
