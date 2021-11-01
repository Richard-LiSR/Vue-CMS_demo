const mongoose = require('../utils/conn_db')

const UserShema = mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String, set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model("admin", UserShema, "admin")