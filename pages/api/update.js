const db = require("../../mongoose/db");
const User = require("../../mongoose/user");
const Contact = require("../../mongoose/phoneBook");
const mySecretKey = process.env.SECRET_KEY;
var CryptoJS = require("crypto-js");
const sendEmail = require("./sendemail");
var jwt = require('jsonwebtoken');

export default async function handler(req,res){
  if(req.method == 'PUT' && req.body.token){
    let {name, number, address, email, token, contactId} = req.body;
    // console.log(req.body)
    try {
      const isValidToken = jwt.verify(token,mySecretKey);
      const secretkey = isValidToken.secretkey;
      name = CryptoJS.AES.encrypt(name, secretkey).toString();
      number = CryptoJS.AES.encrypt(number, secretkey).toString();
      address= CryptoJS.AES.encrypt(address, secretkey).toString();
      email = CryptoJS.AES.encrypt(email, secretkey).toString();
      await Contact.findOneAndUpdate({_id:contactId},{
        name, number, address, email
      });
      // console.log(res)
      // console.log(contact)
      res.status(200).json({
        success: true,
        message: "Updated successful"
      });
    } catch (e) {
      console.log(e)
      res.status(500).json({
        success: false,
        message: "Internal serever error"
      });
    }
  }
  else{
    res.status(500).json({
        success: false,
        message: "Method not allowed or token not found"
      });
  }
}