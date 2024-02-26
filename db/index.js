// 导入 oracledb 模块
const oracledb = require('oracledb');

// 创建一个配置对象，包含数据库连接信息
const dbConfig = {
    user: "yhpt_ips",   //用户名
    password: "Wzrmyy#ips",  //密码
    // connectString: "172.16.16.123/orclpdb1"  //数据库连接实例 测试连接  172.16.1.145:1521/yhptpdb
    connectString: "172.16.1.145:1521/yhptpdb"
};

// 封装一个函数，用于执行 SQL 查询
async function runQuery(sql, params) {
    let connection;

    try {
        // 获取数据库连接
        connection = await oracledb.getConnection(dbConfig);

        // 执行 SQL 查询
        const result = await connection.execute(sql, params);

        // 返回查询结果
        return result.rows;
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                // 关闭数据库连接
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

// 封装更新方法
async function update(sql, params) {
    const connection = await oracledb.getConnection(dbConfig);
    try {
        const result = await connection.execute(sql, params, { autoCommit: true });
        return result
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        await connection.close();
    }
}

module.exports = {
    runQuery,
    update
}
