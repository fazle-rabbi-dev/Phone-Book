const db = require("../../mongoose/db");
const User = require("../../mongoose/user");
const mySecretKey = process.env.SECRET_KEY;
var jwt = require('jsonwebtoken');

export default async function handler(req,res){
  if(req.method == 'POST'){
    let { name,email,token } = req.body;
    if(!name || !token || !email){
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })
      return;
    }
    // if npassword && token
    // Verify token
    try {
      const userData = jwt.verify(token,mySecretKey);
      await User.findOneAndUpdate({email:userData.email},{
        name,email
      })
      res.status(200).json({
        success: true,
        message: "Updated successful"
      })
    } catch (e) {
      console.log("Error")
      res.status(500).json({
        success: false,
        message: "Updated failed"
      })
    }
  }
  else{
    res.status(405).json({
      success: false,
      message: "Method is not allowed!"
    })
  }
}