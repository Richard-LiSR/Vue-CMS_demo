var express = require('express')
var router = express.Router();
var userlist = require('../model/Sp_Usermodel')
// var getAllSpUserlist = require('../modules/')

router.get('/findUserlist',
  (req, res, next) => {
    userlist.find({
      "query": req.query.query,
      "pagenum": req.query.pagenum,
      "pagesize": req.query.pagesize
    }, (err, result) => {
      if (err) return res.sendResult(null, 400, err);
      console.log('获取管理员列表成功');
      // res.send(doc)
      res.sendResult(result, 200, "获取管理员列表成功");
    }
    )
  }
)

module.exports = router
