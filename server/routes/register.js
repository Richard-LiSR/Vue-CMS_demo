var express = require('express');
var router = express.Router();
const Admin = require('../model/AdminModel')

router.get('/register', (req, res, next) => {
  const adminRegister = new Admin ({
    username: "admin",
    password: "123456",
  })
  adminRegister.save((err) => {
    if(err){
      console.log(err)
      return
    }
    console.log('注册成功')
  })
  res.status(200).send(adminRegister)
})

module.exports = router