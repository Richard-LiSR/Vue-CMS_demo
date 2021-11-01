const mongoose = require('../utils/conn_db')

const MenuShema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  _id: { type: Number },
  id:{type:Number},
  authName:{type:String},
  path:{type:String},
  children:[
    {
    _id: { type: Number},
    id: { type: Number },
    authName: { type: String },
    children: {type:Array},
    path: { type: String },
  }
  ],
  order:{type:Number}
},
)

module.exports = mongoose.model("Menus", MenuShema, "menu")