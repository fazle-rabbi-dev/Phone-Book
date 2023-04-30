const db = require("../../../mongoose/db");
const User = require("../../../mongoose/user");


export default async function handler(req,res){
  // const users = await User.find();
  res.json({users:null});
}