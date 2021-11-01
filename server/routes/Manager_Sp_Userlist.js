var express = require('express');
var Sp_userlistModel = require('../model/Sp_Usermodel')
var router = express.Router();

router.post('/saveuserlist', (req, res, next) => {
  Sp_userlistModel.init()
  const adduser = new Sp_userlistModel(
    params = {
      "id": req.body.id,
      "username": req.body.username,
      "password": req.body.password,
      "mobile": req.body.mobile,
      "email": req.body.email,
      "role_name": "超级管理员",
      "mg_state": true
    }
  )
  console.log(params)
  adduser.save(params)
  res.sendResult(adduser, 201, "用户添加成功");
})
module.exports = router