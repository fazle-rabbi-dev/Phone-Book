const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phoneBookSchema = Schema({
  userId: {type: String,required:true},
  name: {type: String,required:true},
  number: {type: String,required:true},
  address: {type: String,default:''},
  email: {type: String,default:''},
  createdOn: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.models.Contact || mongoose.model("Contact", phoneBookSchema);