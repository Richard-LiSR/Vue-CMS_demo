var express = require('express');
var router = express.Router();
var findMenu = require('../model/MenuModel')

router.get('/getmenulist', (req, res, next) => {
  findMenu.find({}, function (err, doc) {
    if (err) return res.sendResult(null, 400, err);
    res.sendResult(doc, 200, "获取菜单栏成功");
  })
})

module.exports = router