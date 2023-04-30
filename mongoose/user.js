const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {type: String,required:true},
  email: {type: String,required:true},
  password: {type: String,required:true},
  token: {type: String,required:true},
  passwordResetToken: {type: String,default: ''},
  isVerified: {type: Boolean,required:true,default:null},
  createdOn: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);