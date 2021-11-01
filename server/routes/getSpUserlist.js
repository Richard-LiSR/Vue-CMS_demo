var express = require('express')
var router = express.Router();
var userlist = require('../model/Sp_Usermodel')

router.get('/getSpuserlist/:id',
  (req, res, next) => {
    userlist.findOne({"id":req.params.id},(err, doc) => {
      if (err) return res.sendResult(null, 400, err);
      console.log('获取用户信息成功');
      res.sendResult(doc, 200, "获取用户信息成功");
    })
  }
)



module.exports = router
