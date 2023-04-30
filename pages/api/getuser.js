const db = require("../../mongoose/db");
const User = require("../../mongoose/user");
const Contact = require("../../mongoose/phoneBook");
const mySecretKey = process.env.SECRET_KEY;
var CryptoJS = require("crypto-js");
const sendEmail = require("./sendemail");
var jwt = require('jsonwebtoken');


export default async function handler(req,res){
  if(req.method == 'POST'){
    const { token } = req.body;
    if(!token){
      res.status(401).json({
        success: false,
        user: null,
        message: "Token required"
      })
      return;
    }
    // if token found
    // verify token
    try {
      const userData = jwt.verify(token,mySecretKey);
      const user = await User.findOne({email:userData.email});
      // console.log(user)
      res.status(200).json({
        success: true,
        user
      })
      return;
    } catch (e) {
      console.log("[*] Token is not valid")
      res.status(200).json({
        success: false,
        user: null,
        message: "Oops! something went wrong"
      })
      return;
    }
    
  }
  else{
    res.status(405).json({
      success: false,
      user: null,
      message: "Method not allowed"
    })
  }
}