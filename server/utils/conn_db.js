const config = require('../config/config')
// 连接数据库
var mongoose = require('mongoose')

mongoose.connect(config.dburl,{useNewUrlParser:true}, (err) =>{
    if(err) {
    console.log("数据库连接失败");
    return;
  }
  console.log("数据库连接成功");
})

module.exports = mongoose