var express = require('express');
var router = express.Router();
const svgCaptcha = require('svg-captcha')
var Verifycode = require('../model/VerifyCodeModel')

/* GET users listing. */
router.get('/code', function (req, res, next) {
  var captcha = svgCaptcha.create();
  // 保存验证码保存到session中
  req.session.captcha = captcha.text;
  console.log(req.session.captcha);
  res.type('svg');
  // 将其保存到mongodb数据库中
  var result = new Verifycode({
    code: req.session.captcha,
  })
  Verifycode.db.dropCollection('verifycode',(err) => {
    if(err){
      console.log(err);
      return
    }
    console.log("已删除原验证码");
  })
  result.save((err) => {
    if (err) {
      console.log(err);
      return
    }
    console.log("验证码添加至数据库成功");
  })
  // 发送验证码
  res.status(200).send(captcha.data);




});
module.exports = router;