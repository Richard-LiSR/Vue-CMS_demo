const mongoose = require('../utils/conn_db')

const Sp_UserListShema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  id: { type: Number, unique: true},
  // create_time: { type: Number },
  email: { type: String },
  mg_state: { type: Boolean },
  mobile:{type:String},
  role_name:{type:String},
  username: { type: String, unique: true},
  password: {
    type: String, set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  }
},
)

module.exports = mongoose.model("sp_userlists", Sp_UserListShema, "sp_userlist")