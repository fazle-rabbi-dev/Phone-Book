const db = require("../../mongoose/db");
const User = require("../../mongoose/user");
const Contact = require("../../mongoose/phoneBook");
var jwt = require('jsonwebtoken');
const mySecretKey = process.env.SECRET_KEY;

export default async function handler(req,res){
  if(req.method == 'DELETE'){
    const { token,id } = req.body;
    console.log(id)
    // Check token validity
    if(!token && !id){
      res.status(500).json({
        success: false,
        message: "Valid data required!"
      })
      return;
    }
    try {
      const isValidToken = jwt.verify(token,mySecretKey);
      // console.log(isValidToken)
      await Contact.findOneAndDelete({_id:id});
      res.status(500).json({
        success: true,
        message: "Deleted successful"
      })
    } catch (e) {
      console.log(e)
      res.status(500).json({
        success: false,
        message: "Token Invalid"
      })
    }
    
  }
}