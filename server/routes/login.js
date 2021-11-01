var express = require('express');
var router = express.Router();
// var bcrypt = require("bcryptjs");
const Admin = require('../model/Sp_Usermodel')
// const Admin = require('../model/AdminModel')
const secret = "daipfjwaefefdad12asdaDdQSadaDAd"



router.post('/login', async (req, res) => {
  const username = req.body.username
  // console.log(username);
  const admin = await Admin.findOne({username:username})
  // 生成token  
  const jwt = require('jsonwebtoken')
  const token = jwt.sign({
    id: String(admin._id)
  }, secret)
  res.send({
    // res.josn({status:200}),
    status: 200,
    admin,
    token: token
  })
});



module.exports = router;