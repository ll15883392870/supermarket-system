// users路由模块，主要处理用户管理模块的路由处理

var express = require('express');
var router = express.Router();

//设置多个响应头，拦截所有请求
router.all('*', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  // 设置允许cookie
  res.setHeader("Access-Control-Allow-Credentials", true)
  //给其他路由放行
  next();
})


// 引入数据库
const connection = require('./connet.js')

//接收登录检查请求
router.post('/checklogin', (req, res) => {
  let {
    username,
    password
  } = req.body;
  const sqlstr = `select * from users where username='${username}' and password='${password}'`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err
    } else {
      if (data.length) {
        // 设置cookie
        res.cookie("userid", data[0].id)
        res.cookie("username", data[0].username)

        res.send({
          "errCode": 1,
          "Msg": "家乐美欢迎您"
        })
      } else {
        res.send({
          "errCode": 0,
          "errMsg": "请检查用户名或密码"
        })
      }
    }
  })

})

// 检查用户登录状态
router.get('/checkislogin', (req, res) => {
  let userid = req.cookies.userid;
  let username = req.cookies.username;
  if (userid && username) {
    // 存在
    res.send({
      "isLogin": true
    })
  } else {
    // 不存在
    res.send({
      "isLogin": false
    })

  }

})

//显示当前登录名
router.get('/getusername', (req, res) => {
  //从cookie中获取用户名
  let username = req.cookies.username;
  res.send(username)
})

//退出登录请求
router.get('/exitlogin', (req, res) => {
  res.clearCookie('userid'),
    res.clearCookie('username')
  res.send({
    "Code": "1",
    "Msg": '退出成功'
  })

})

//检查旧密码是否正确
router.get('/checkoldpw', (req, res) => {
  let {
    oldpwd
  } = req.query;
  let id = req.cookies.userid;
  const sqlstr = `select * from users where id=${id}`;
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err
    } else {
      if (data.length) {
        if (oldpwd === data[0].password) {
          //正确
          res.send({
            "Code": 1,
            "Msg": "旧密码输入正确"
          })
        } else {
          res.send({
            "Code": 0,
            "errMsg": "旧密码输入不正确"
          })
        }
      }
    }
  })

})

//修改旧密码
router.get('/updateoldpwd', (req, res) => {
  let {
    newpwd
  } = req.query
  let id = req.cookies.userid
  const sqlstr = `update users set password='${newpwd}' where id='${id}'`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err
    } else {
      //如果受影响行数>0成功
      if (data.affectedRows > 0) {
        res.clearCookie('userid'),
          res.clearCookie('username')
        res.send({
          "Code": 1,
          "Msg": "修改密码成功"
        })
      } else {
        res.send({
          "errCode": 0,
          "errMsg": "修改密码失败"
        })
      }
    }
  })
})

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

//接收分页账号列表请求
router.get('/userslist', (req, res) => {
  //currentPage当前页码 pageSize每页显示多少条
  let {
    currentPage,
    pageSize
  } = req.query;
  currentPage = currentPage ? currentPage : 1;
  pageSize = pageSize ? pageSize : 3;
  let sqlstr = `select * from users order by date desc`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err;
    } else {
      //数据总条数
      let totalcount = data.length
      let n = (currentPage - 1) * pageSize; //跳过多少条显示数据
      sqlstr += ` limit ${n},${pageSize}`
      connection.query(sqlstr, (err, data) => {
        if (err) {
          throw data
        } else {
          res.send({
            "totalcount": totalcount,
            "data": data
          })
        }
      })

      // 分页查询语句
      //查询数据返回至前端
      // res.send(data)
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