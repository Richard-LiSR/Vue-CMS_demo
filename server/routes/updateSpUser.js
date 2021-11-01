var express = require('express')
var router = express.Router();
var Spuserlist = require('../model/Sp_Usermodel')

router.put('/updateSpuserlist/:id', (req, res, next) => {
  Spuserlist.findOneAndUpdate({ "id": req.params.id }, {
    "mobile": req.body.mobile,
    "email": req.body.email
  },(err, doc) => {
    if (err) return res.sendResult(null, 400, err);
    console.log('修改用户成功')
    res.sendResult(doc, 200, "修改用户成功");
  })
})

module.exports = router

