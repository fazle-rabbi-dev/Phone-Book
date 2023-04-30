const db = require("../../mongoose/db");
const User = require("../../mongoose/user");

export default async function handler(req,res){
  if(req.query.token){
    const {token} = req.query;
    // console.log(token)
    const user = await User.findOne({token});
    if(!user){
      res.status(200).json({
        success: false,
        message: "Oops! invalid token!"
      });
      return;
    }
    else{
      if(user.isVerified){
        res.status(200).json({
          success: true,
          message: "Your account is already activated"
        });
        return;
      }
      // Activate account
      await User.findOneAndUpdate({token},{
        isVerified: true
      });
      res.status(200).json({
        success: true,
        message: "Account activated successful."
      });
    }
  }
  else{
    res.status(500).
    json({
      success: false,
      message: 'Internal server error'
    })
  }
}
