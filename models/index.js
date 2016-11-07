var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db=mongoose.connect("mongodb://localhost/fogetdb");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: {type: Date, default: Date.now},
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model("Users", userSchema);