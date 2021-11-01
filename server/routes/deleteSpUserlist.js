var express = require('express')
var router = express.Router();
var userlist = require('../model/Sp_Usermodel')

router.delete('/getSpuserlist/:id',
  (req, res, next) => {
    userlist.deleteOne({ "id": req.params.id }, (err, doc) => {
      if (err) return res.sendResult(null, 400, err);
      console.log('删除数据成功');
      res.sendResult(doc, 200, "删除数据成功");
    })
  }
)

module.exports = router