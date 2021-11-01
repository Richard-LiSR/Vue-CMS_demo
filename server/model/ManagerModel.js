const mongoose = require('../utils/conn_db')

//定义schema

let ManagerShema = mongoose.Schema({
  username:{type:String},
  password:{type:String},
  email:{type:String},
  mobile:{type:String},
})



module.exports = mongoose.model("Manager",ManagerShema,"manager")