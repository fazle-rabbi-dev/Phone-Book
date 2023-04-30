const db = require("../../mongoose/db");
const User = require("../../mongoose/user");
const mySecretKey = process.env.SECRET_KEY;
var CryptoJS = require("crypto-js");
const sendEmail = require("./sendemail");
const crypto = require("crypto");
var jwt = require('jsonwebtoken');

export default async function handler(req,res){
  if(req.method == 'PUT'){
    const { npassword,token } = req.body;
    if(!token || !npassword){
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })
      return;
    }
    
    // if token exists verify token
    try {
      const userData = jwt.verify(token,mySecretKey);
      // Update password by encrypting
      const newPassword = CryptoJS.AES.encrypt(npassword, mySecretKey).toString();
      await User.findOneAndUpdate({email:userData.email},{
        password: newPassword
      });
      res.status(200).json({
        success: true,
        message: "Password updated successful"
      });
    } catch (e) {
      // console.log(e)
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })
    }
  }
  else{
    res.status(405).json({
      success: false,
      message: "Method not allowed"
    })
  }
}