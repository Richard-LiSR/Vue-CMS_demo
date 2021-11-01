var express = require('express')
var router = express.Router();
var Spuserlist = require('../model/Sp_Usermodel')



module.exports.findAllManagers = function (conditions, cb) {
  if (!conditions.pagenum) return cb("pagenum 参数不合法");
  if (!conditions.pagesize) return cb("pagesize 参数不合法");
  // 通过关键词获取管理员数量
  Spuserlist.find({})
}