//连接数据库公用模块

// 引入mysql模块
const mql=require('mysql')

// 创建连接
var connection=mql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'supermarket'
})

// 连接
connection.connect(()=>{
    console.log('数据库连接成功');
})

// 暴露
module.exports=connection