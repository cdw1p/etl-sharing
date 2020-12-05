const mongoose = require('mongoose')
const Schema = mongoose.Schema
const users = new Schema({
  username: { type: String },
  fullname: { type: String },
  number_phone: { type: Number }
})

module.exports = mongoose.model('users', users)