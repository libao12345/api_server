//导入数据库操作模块
const db = require('../db/index')
const oracledb =  require('oracledb')

//这是路由处理模块
exports.getArtCates = async (req, res) => {
    //定义查询患者信息数据 sql 语句
    const sql = 'Select patient_file.patient_file_id,patient_name,gender,birthday,telephone,create_date,card_no From patient_file Left Join patient_card_data On patient_file.patient_file_id = patient_card_data.patient_file_id Order By create_date Desc'
    //调用 runQuery 方法查询数据
    db.runQuery(sql, []).then(rows => {
        if(rows.length<1) return res.msg('无数据！')

        let newRows = []
        rows.forEach((item, index) => {
            //转换成为json对象
            const newRows1 = JSON.parse(JSON.stringify( {patient_file_id: item[0], patient_name: item[1], gender: item[2], birthday: item[3], telephone: item[4], create_date: item[5], card_no: item[6]} ))
            newRows.push(newRows1)
            // console.log(`这是第${index}次循环`)
        })

        res.send({
            status: 0,
            totals: rows.length,
            message: '查询患者建档信息成功!',
            data: newRows
        })
    })
}

//根据 患者姓名或者身份证号码 获取患者建档信息的路由处理函数
exports.getArtCatesByname = async (req, res) => {
    //
    let sql = `Select patient_file.patient_file_id,patient_name,gender,birthday,telephone,create_date,card_no From patient_file 
        Left Join patient_card_data On patient_file.patient_file_id = patient_card_data.patient_file_id `

    const paramsName = '%' + req.query.patient_name + '%'
    const paramsCardno = req.query.card_no + '%'
    //判断用户是否传了身份证但是没有传姓名
    if (req.query.patient_name === undefined || req.query.patient_name === null || req.query.patient_name === '') { 
        sql = sql + ' Where card_no like :card_no'
        db.runQuery(sql, [paramsCardno] ).then(rows => {
            let newRows = []
            rows.forEach((item, index) => {
                //转换成为json对象
                const newRows1 = JSON.parse(JSON.stringify( {patient_file_id: item[0], patient_name: item[1], gender: item[2], birthday: item[3], telephone: item[4], create_date: item[5], card_no: item[6]} ))
                newRows.push(newRows1)
                // console.log(`这是第${index}次循环`)
            })
    
            if(rows.length < 1) {
                return res.msg('无数据！')
            }
            res.send({
                status: 0,
                message: '查询数据成功！',
                data: newRows
            })
        })
    } else if (req.query.card_no === undefined || req.query.card_no === null || req.query.card_no === '') {   //判断用户是否传了姓名但是没有传身份证   
        sql = sql + ' Where patient_name like :patient_name'  
        db.runQuery(sql, [paramsName] ).then(rows => {
            let newRows = []
            rows.forEach((item, index) => {
                //转换成为json对象
                const newRows1 = JSON.parse(JSON.stringify( {patient_file_id: item[0], patient_name: item[1], gender: item[2], birthday: item[3], telephone: item[4], create_date: item[5], card_no: item[6]} ))
                newRows.push(newRows1)
                // console.log(`这是第${index}次循环`)
            })
    
            if(rows.length < 1) {
                return res.msg('无数据！')
            }
            res.send({
                status: 0,
                message: '查询数据成功！',
                data: newRows
            })
        })
    } else {
        sql = sql + ' Where patient_name like :patient_name or card_no like :card_no'
        db.runQuery(sql, [paramsName,paramsCardno] ).then(rows => {
            
            let newRows = []
            rows.forEach((item, index) => {
                //转换成为json对象
                const newRows1 = JSON.parse(JSON.stringify( {patient_file_id: item[0], patient_name: item[1], gender: item[2], birthday: item[3], telephone: item[4], create_date: item[5], card_no: item[6]} ))
                newRows.push(newRows1)
                // console.log(`这是第${index}次循环`)
            })
            if(rows.length < 1) {
                return res.msg('无数据！')
            }
            res.send({
                status: 0,
                message: '查询数据成功！',
                data: newRows
            })
        })
    }

}


//根据 id 更新患者建档信息的路由处理函数
exports.updateArtCatesById = async (req, res) => {
    //定义更新患者姓名的执行 sql
    const sql = `Update patient_file Set patient_name = :patient_name where patient_file_id = :patient_file_id`
    //获取body 表单提交的参数
    const updateParams = {
        patient_name: req.body.patient_name,
        patient_file_id: req.body.patient_file_id
    }
    //更新患者建档数据
    const result = db.update(sql, updateParams)
    if((await result).rowsAffected === 1) {
        res.msg('更新数据成功！', 0)
    }else {
        res.msg('更新数据失败!')
    }
}