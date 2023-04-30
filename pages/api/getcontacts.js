const db = require("../../mongoose/db");
const Contact = require("../../mongoose/phoneBook");
const User = require("../../mongoose/user");
const mySecretKey = process.env.SECRET_KEY;
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

export default async function handler(req,res){
  try {
    const {token,secretkey} = req.body;
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhYmJpQGdtYWlsLmNvbSIsInNlY3JldGtleSI6Impza3dvb3dvZCIsImlhdCI6MTY4MTEyODA5M30.et8sl1lEhUI_WoeRgllylHTtfMXvwjTz_9ufjW2e3-g'
    const user_data = jwt.verify(token,mySecretKey);
    let user = await User.findOne({email:user_data.email});
    user = JSON.parse(JSON.stringify(user));
    const contacts = await Contact.find({userId:user._id});
    // Decrypt all data before send to client
    const newContacts = [];
    for(let contact of contacts){
      const name  = CryptoJS.AES.decrypt(contact.name, secretkey).toString(CryptoJS.enc.Utf8);
      const number  = CryptoJS.AES.decrypt(contact.number, secretkey).toString(CryptoJS.enc.Utf8);
      const address  = CryptoJS.AES.decrypt(contact.address, secretkey).toString(CryptoJS.enc.Utf8);
      const email  = CryptoJS.AES.decrypt(contact.email, secretkey).toString(CryptoJS.enc.Utf8);
      const obj = {
        id:contact._id,name,number,address,email
      };
      newContacts.push(obj);
    }
    res.status(200).json({
      success: true,
      contacts:newContacts
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      contacts: null
      /*contacts: [
          {name:'smith',number:'01917919919'},
          {name:'david',number:'01612919919'},
          {name:'john',number:'01918919919'},
          {name:'sakiber (gf)',number:'01870002116'},
          {name:'sakiber (gf)',number:'01870002116'},
          {name:'sakiber (gf)',number:'01870002116'},
          {name:'sakiber (gf)',number:'01870002116'},
          {name:'sakiber (gf)',number:'01870002116'},
        ]*/
    });
  }
}