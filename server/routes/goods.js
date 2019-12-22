// goods路由模块，主要处理商品管理模块的路由处理

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


// 引入数据库连接模块
const connection = require('./connet.js')

// 接收添加商品请求
router.post('/addgoods', (req, res) => {
  //接收参数
  let {
    cateName,
    barCode,
    goodsName,
    costPrice,
    marketPrice,
    salePrice,
    goodsNum,
    goodsWeight,
    unit,
    discount,
    promotion,
    goodsDesc,
  } = req.body
  //把数据存入数据库
  const sqlstr = `insert into goods ( cateName,
    barCode,
    goodsName,
    costPrice,
    marketPrice,
    salePrice,
    goodsNum,
    goodsWeight,
    unit,
    discount,
    promotion,
    goodsDesc) values ('${cateName}','${barCode}','${goodsName}','${costPrice}','${marketPrice}','${salePrice}','${goodsNum}','${goodsWeight}','${unit}','${discount}','${promotion}','${goodsDesc}')`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err;
    } else {
      //如果受影响行数>0成功
      if (data.affectedRows > 0) {
        res.send({
          "Code": 1,
          "Msg": "添加商品成功"
        })
      } else {
        res.send({
          "errCode": 0,
          "errMsg": "添加商品失败"
        })

      }
    }
  })
})

//接收分页查询商品请求
router.get('/getgoodslist', (req, res) => {
  //currentPage当前页码 pageSize每页显示多少条
  let {
    currentPage,
    pageSize,
    cateName,
    keyword
  } = req.query;
  currentPage = currentPage ? currentPage : 1;
  pageSize = pageSize ? pageSize : 3;
  let sqlstr = `select * from goods where 1=1`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err;
    } else {
      //数据总条数
      let totalcount = data.length
      // 有分类名称且分类不等于空
      if (cateName !== '' && cateName !== '全部') {
        sqlstr += ` and cateName='${cateName}'`
      }
    
      //有分类名称或条形码
      if (keyword !== '') {
        sqlstr += ` and (goodsName like "%${keyword}%" or barCode like "%${keyword}%")`
      }
      connection.query(sqlstr, (err, data) => {
        if (err) {
          throw err
        } else {
          // 重新计算数据总条数 按照查询结果分页
          totalcount = data.length
          // res.send(data)
        }
      })

      //排序
      sqlstr+=` order by ctime desc`

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
    }
  })
})

// 接收修改账号请求
router.get('/editgoods', (req, res) => {
  // 接收需要修改的数据
  let {
    id
  } = req.query
  const sqlstr = `select * from goods where id = ${id}`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data)
    }
  })
})

//接收保存修改商品的请求
router.post('/saveedit', (req, res) => {
  let {
    cateName,
    barCode,
    goodsName,
    costPrice,
    marketPrice,
    salePrice,
    goodsNum,
    goodsWeight,
    unit,
    discount,
    promotion,
    goodsDesc,
    editid
  } = req.body;
  let sqlstr = `update goods set cateName='${cateName}',barCode='${barCode}',goodsName='${goodsName}',
    costPrice='${costPrice}',marketPrice='${marketPrice}',salePrice='${salePrice}',goodsNum='${goodsNum}',
    goodsWeight='${goodsWeight}',unit='${unit}',discount='${discount}',promotion='${promotion}',
    goodsDesc='${goodsDesc}' where id=${editid}`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err
    } else {
      if (data.affectedRows > 0) {
        res.send({
          "Code": 1,
          "Msg": "修改商品成功"
        })
      } else {
        res.send({
          "errCode": 0,
          "errMsg": "修改商品失败"
        })
      }
    }
  })

})

//接收删除商品请求
router.get('/delegoods', (req, res) => {
  let {
    id
  } = req.query
  const sqlstr = `delete from goods where id = ${id}`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({
          "Code": 1,
          "Msg": "删除商品成功"
        })
      } else {
        res.send({
          "errCode": 0,
          "errMsg": "删除商品失败"
        })
      }
    }
  })
})

//接收删除勾选请求
router.post('/detelegoodsall', (req, res) => {

  let {
    idArr
  } = req.body;
  idArr = JSON.parse(idArr)
  const sqlstr = `delete from goods where id in (${idArr})`
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err
    } else {
      if (data.affectedRows > 0) {
        res.send({
          "Code": 1,
          "Msg": "删除勾选成功"
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

// 接收模糊查询请求
router.get('/search', (req, res) => {
  let {
    cateName,
    keyword
  } = req.query
  let sqlstr = `select * from goods where 1 = 1`


  if (cateName !== '' && cateName !== undefined) {
    // 有分类名称且分类不等于空
    sqlstr += ` and cateName='${cateName}'`
  }

  if (keyword !== '') {
    //有分类名称或条形码
    sqlstr += ` and (goodsName like "%${keyword}%" or barCode like "%${keyword}%")`
  }
  connection.query(sqlstr, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})

module.exports = router;