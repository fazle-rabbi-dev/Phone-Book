const db = require("../../mongoose/db");
const User = require("../../mongoose/user");
const Contact = require("../../mongoose/phoneBook");
const mySecretKey = process.env.SECRET_KEY;
var CryptoJS = require("crypto-js");
const sendEmail = require("./sendemail");
var jwt = require('jsonwebtoken');

export default async function handler(req,res){
  if(req.method == 'POST'){
    let { email,password,secretkey } = req.body;
    // Check user exists or not
    const user = await User.findOne({email});
    if(!user){
      res.status(404).json({
        success: false,
        message: "User not found"
      });
      return;
    }
    // Decrypt password
    const bytes  = CryptoJS.AES.decrypt(user.password, mySecretKey);
    const plainPassword = bytes.toString(CryptoJS.enc.Utf8);
    if(password == plainPassword){
      // Check secretkey is valid or not
      const contact = await Contact.findOne({userId:user._id});
      if(contact){
        try {
          let name = contact.name;
          const bytes  = CryptoJS.AES.decrypt(name, secretkey);
          const decryptedName = bytes.toString(CryptoJS.enc.Utf8);
          if(decryptedName){
          }
          else{
            res.status(500).json({
             success: false,
             message: "Wrong secretkey!"
            });
            return;
          }
        } catch (e) {
          res.status(500).json({
            success: false,
            message: e.message
          });
          return;
        }
      }
      
      // if not activate account
      if(!user.isVerified){
        res.status(200).json({
          success: false,
          message: "You account is not activate.Please check your email inbox and activate your account."
        });
        return;
      }
      // if activate account and everything is fine
      const token = jwt.sign({email,secretkey}, mySecretKey);
      const user_data = {
        email,
        secretkey,
        token
      };
      res.status(200).json({
        success: true,
        message: "Logged in successful",
        user_data
      });
    }
    else{
      res.status(401).json({
        success: false,
        message: "Invalid email address or password!"
      });
    }
  }
  else{
    res.status(200).json({
      success: false,
      message: "Method not allowed!"
    });
  }
}
