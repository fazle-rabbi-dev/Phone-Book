const db = require("../../mongoose/db");
const User = require("../../mongoose/user");
const mySecretKey = process.env.SECRET_KEY;
var CryptoJS = require("crypto-js");
const sendEmail = require("./sendemail");
const crypto = require("crypto");

function generateToken() {
  // Generate a random buffer
  const buffer = crypto.randomBytes(32);
  // Convert the buffer to a hexadecimal string
  const token = buffer.toString('hex');
  return token;
}


export default async function handler(req, res) {
  if(req.method == 'POST'){
    let {name,email,password} =req.body;
    if(!name || !email || password.length < 6){
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })
      return;
    }
    const token = generateToken();
    const emailSubject = "Phone-Book Registration";
    const emailBody = `
    <h3>Dear, ${name}</h3>
    
    <p>Thank you for your interest in my 
    Phone-Book app! To complete your registration, 
    please click on <a href="${process.env.NEXT_PUBLIC_HOST}/verify?token=${token}">this</a>
    activation link.
    Once activated, you'll be able to easily store and 
    manage your contacts online.</p>
    </br>
    Best regards,
    <p><b>Fazle Rabbi</b></p>
    <p>(Phone-Book Developer)</p>
    `;
    const user = await User.findOne({email});
    // if user exists then don't create new user
    if(user){
      res.status(200).json({
        success: false,
        message: "This email address already registered!Please use another email address."
      });
      return;
    }
    // when user not exists with user email address create new user
    // Let's encrypt password
    password = CryptoJS.AES.encrypt(password, mySecretKey).toString();
    const newUser = new User({
      name,email,password,token,
      isVerified: false
    });
    const ref = sendEmail(email,emailSubject,emailBody);
    console.log(ref)
    await newUser.save();
    console.log("Saved successful")
    res.status(200).json({
      success: true,
      // user: {email,secretkey},
      message: "Account created successful"
    });
  }
  else{
    res.status(200).json({
      success: false,
      message: "Method not allowed!"
    });
  }
};
