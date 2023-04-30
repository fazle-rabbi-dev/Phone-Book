const db = require("../../mongoose/db");
const User = require("../../mongoose/user");
const mySecretKey = process.env.SECRET_KEY;
var CryptoJS = require("crypto-js");
const sendEmail = require("./sendemail");
const crypto = require("crypto");

export default async function handler(req,res){
  if(req.method == 'GET'){
    try {
      const {token} = req.query;
      if(!token){
        throw new Error();
      }
      // Check token is valid or not
      const user = await User.findOne({passwordResetToken:token});
      if(!user){
        throw new Error();
      }
      res.status(200).json({
          success: true
      })
      return;
    } catch (e) {
      res.status(500).json({
          success: false
      })
      return;
    }
  }
  if(req.method == 'POST'){
    const { npassword,token } = req.body;
    const user = await User.findOne({passwordResetToken:token});
    // Find user with token
    if(!user || !npassword || npassword.length < 6){
      res.status(500).json({
        success: false,
        message: "Password reset not successful.Please click on link that sent to your email address"
      })
      return;
    }
    // Encrypt Password before change
    const password = CryptoJS.AES.encrypt(npassword, mySecretKey).toString();
    // Check token valid or not
    if(user.passwordResetToken == token){
      await User.findOneAndUpdate({email:user.email},{
        passwordResetToken: '',
        password
      })
      res.status(200).json({
        success: true,
        message: "Password reset successful.You can login now with new password."
      })
      return;
    }
    res.status(500).json({
      success: false,
      message: "Oops! something went wrong while reseting password!"
    })
  }
  else{
    res.status(405).json({
      success: false,
      message: "Method not allowed!"
    })
  }
}