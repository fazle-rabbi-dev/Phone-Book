const mongoose = require('mongoose') 
const URI= `${process.env.MONGO_URI}/phone-book`

const connectionParams = { 
   useNewUrlParser: true, 
   useUnifiedTopology: true
} ;

mongoose.connect(URI,connectionParams) 
 .then( () => { 
   console.log('[*] Connected to mongodb database successfully…!');
}) 
.catch( (err) => { 
  console.error(`err`);
});