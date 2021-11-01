const mongoose = require('../utils/conn_db')

let codeShema = mongoose.Schema({
  code: { type: String }
})
module.exports = mongoose.model("Verifycode", codeShema, "verifycode")