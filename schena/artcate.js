//导入定义验证的规则模块
const joi = require('joi')

//导入 patient_name 的验证规则
const patient_name = joi.string()
const card_no = joi.string()

//建档 id 校验规则
const patient_file_id = joi.number().integer().min(1).required()

//向外共享验证规则对象
exports.get_cate_schema = {
    body: {
        patient_name,
        card_no
    }
}

exports.update_cateid_schema = {
    body: {
        patient_file_id: patient_file_id,
        patient_name,
    }
}