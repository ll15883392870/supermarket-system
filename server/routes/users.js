// users路由模块，主要处理用户管理模块的路由处理

var express = require('express');
var router = express.Router();

//设置多个响应头，拦截所有请求
router.all('*', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //给其他路由放行
  next();
})


// 引入数据库
const connection = require('./connet.js')

// 接收添加账号请求
router.post('/adduser', (req, res) => {
  //接收参数
  let {
    username,
    password,
    usergroup
  } = req.body
  //把数据存入数据库
  const sqlstr = `insert into users (username,password,usergroup) values ('${username}','${password}','${usergroup}')`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err;
    } else {
      //如果受影响行数>0成功
      if (data.affectedRows > 0) {
        res.send({
          "errCode": 1,
          "errMsg": "添加账号成功"
        })
      } else {
        res.send({
          "errCode": 0,
          "errMsg": "添加账号失败"
        })

      }
    }
  })
})

//接收账号列表请求
router.get('/userslist', (req, res) => {
  const sqlstr = `select * from users order by date desc`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err;
    } else {

      //查询数据返回至前端
      res.send(data)
    }
  })

})

//接收删除账号请求
router.get('/deleuser', (req, res) => {
  let {
    id
  } = req.query
  const sqlstr = `delete from users where id = ${id}`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({
          "errCode": 1,
          "errMsg": "删除账号成功"
        })
      } else {
        res.send({
          "errCode": 0,
          "errMsg": "删除账号失败"
        })
      }
    }
  })
})

// 接收修改账号请求
router.get('/edituser', (req, res) => {
  // 接收需要修改的数据
  let {
    id
  } = req.query
  const sqlstr = `select * from users where id = ${id}`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data)
    }
  })
})

//接收保存用户的请求
router.post('/saveedit', (req, res) => {
  let {
    username,
    password,
    usergroup,
    editid
  } = req.body;
  let sqlstr = `update users set username='${username}',password='${password}',usergroup='${usergroup}' where id=${editid}`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err
    } else {
      if (data.affectedRows > 0) {
        res.send({
          "errCode": 1,
          "errMsg": "修改账号成功"
        })
      } else {
        res.send({
          "errCode": 0,
          "errMsg": "修改账号失败"
        })
      }
    }
  })

})

//接收删除勾选请求
router.post('/deteleall', (req, res) => {
 
  let {
    idArr
  } = req.body;
  idArr = JSON.parse(idArr)
  const sqlstr = `delete from users where id in (${idArr})`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err
    } else {
      if (data.affectedRows > 0) {
        res.send({
          "errCode": 1,
          "errMsg": "删除勾选成功"
        })
      } else {
        res.send({
          "errCode": 0,
          "errMsg": "删除勾选失败"
        })
      }
    }
  })

})
module.exports = router;