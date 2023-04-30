const db = require("../../mongoose/db");
const User = require("../../mongoose/user");
const sendEmail = require("./sendemail");
const crypto = require("crypto");

function generateToken() {
  // Generate a random buffer
  const buffer = crypto.randomBytes(32);
  // Convert the buffer to a hexadecimal string
  const token = buffer.toString('hex');
  return token;
}

export default async function handler(req,res){
  if(req.method == 'POST'){
    try {
      const {email} = req.body;
      const user = await User.findOne({email});
      console.log(user)
      if(!user){
        res.status(404).json({
          success: false,
          message: "User not found"
        })
      }
      // If user exists
      const token = generateToken();
      const emailSubject = "Phone-Book Password Reset"
      const emailBody = `
      <h3>Dear, ${user.name}</h3>
      
      <p>We received a request to reset the password for your Phone-Book account. To complete the process, please click on the password reset link provided below:</p>
      
      <a href="${process.env.NEXT_PUBLIC_HOST}/resetpassword?token=${token}">reset password</a>
      
      <p>If you did not initiate this request, please ignore this email.</p>
      
      <p>Thank you for using Phone-Book.</p>
      
      <p>Best regards,</br>
      <b>Fazle Rabbi</b></p>
      `;
      // Store the token
      await User.findOneAndUpdate({email},{
        passwordResetToken: token
      })
      console.log(user)
      sendEmail(email,emailSubject,emailBody);
      res.status(405).json({
        success: true,
        message: "Password reset instruction sent to your email address"
      })
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Internal server error!"
      })
    }
  }
  else{
    res.status(405).json({
      success: false,
      message: "Method not allowed!"
    })
  }
}