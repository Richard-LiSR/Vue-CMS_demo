var express = require('express');
const MenuModel = require('../model/MenuModel');
var router = express.Router();

router.get('/menu',(req,res,next) =>{
  MenuModel.init()
  const Menu = new MenuModel(
    {
      _id: 24132,
      id: 103,
      authName: "权限管理",
      path: "rights",
      children: [{
        _id: 4124,
        id: 111,
        authName: "用户列表",
        children: [],
        path: "roles",
      }
      ],
      order: 1
    }
  )
  Menu.save(Menu)
  res.status(200).send(Menu)
})
module.exports = router