const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  phone: String,
  body: String,
  email: String,
  password: String,
  avatar: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;