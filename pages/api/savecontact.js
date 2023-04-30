const db = require("../../mongoose/db");
const Contact = require("../../mongoose/phoneBook");
const User = require("../../mongoose/user");
const mySecretKey = process.env.SECRET_KEY;
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

export default async function handler(req,res){
  if(req.method=='POST'){
    // console.log(req.body)
    let { name,number,address,email,token,secretkey } = req.body;
    try {
      // Check token is valid or invalid
      const user_data = jwt.verify(token,mySecretKey);
      const user = await User.findOne({email:user_data.email});
      // Let's encrypt users contact before save in db
      // secretkey --> This key comes from user!
      name = CryptoJS.AES.encrypt(name, secretkey).toString();
      number = CryptoJS.AES.encrypt(number, secretkey).toString();
      address= CryptoJS.AES.encrypt(address, secretkey).toString();
      email = CryptoJS.AES.encrypt(email, secretkey).toString();
      const newContact = new Contact({
        name,number,address,email,
        userId:user._id
      });
      await newContact.save();
      res.status(200).json({
        success: true,
        message: "New contact saved successful"
      });
    } catch (e) {
      console.log(e)
      res.status(500).json({
        success: false,
        message: "New contact saved failed"
      });
    }
  }
  else{
    res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }
}