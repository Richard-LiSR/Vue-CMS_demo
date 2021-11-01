var express = require('express')
var router = express.Router();
var SpUserlist = require('../model/Sp_Usermodel')

router.put("/getUserInfoState/:id/state/:state",(req, res, next) =>{
    // state = 0
    // if (req.params.state && req.params.state == "true") state = 1
  SpUserlist.findOneAndUpdate({ "id": req.params.id }, { "mg_state": req.params.state},  (err, manager) =>　{
      if (err) return res.sendResult(null, 400, err);
      res.sendResult(manager, 200, "设置状态成功");
    });
  }
)

module.exports = router;