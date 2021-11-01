var express = require('express');
var router = express.Router();
var Verifycode = require('../model/VerifyCodeModel')

router.get('/verify', (req, res, next) => {
  Verifycode.find({}, function (err, doc) {
    if (err) {
      console.log(err);
      return;
    }
    res.sendResult(doc, 200, "查询验证码成功");
  })
})

module.exports = router