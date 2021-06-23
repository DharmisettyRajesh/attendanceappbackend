/*const express = require('express');
const mongoose = require('mongoose');
const bodyparser=require('body-parser');

const httperror = require('./Models/http-error.js');
const first= require('./Routes/firstyear.js');
const second= require('./Routes/secondyear.js');
const third= require('./Routes/thirdyear.js');
const fourth= require('./Routes/fourthyear.js');
const authorization=require('./Routes/signup.js');
const path=require('path');


const app = express();

app.use(bodyparser.json());
app.use(express.static(path.join('public')));

app.use('/firstyear',first);
app.use('/secondyear',second);
app.use('/thirdyear',third);
app.use('/fourthyear',fourth);
app.use('/',authorization);
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PATCH,DELETE');
    next();
  })

 app.use((req,res,next)=>{
    res.sendFile(path.resolve(__dirname,'public','index.html'));
  })  
 app.use((req, res, next) => {
    const error = new httperror("Could not find this route.", 404);
    throw error;
  });
  
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
  });

  mongoose.connect(
      `mongodb+srv://Ramu:Ramu123@cluster0-grn1p.mongodb.net/Rajesh?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true}
    
  )
  .then(()=>{
      app.listen(process.env.PORT|| 5000);
      console.log('connected');
  })
  .catch((err)=>{
      console.log(err);
  });
*/
const express =require('express');
const app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());

app.get('/',(req,res)=>{
  var client= require('twilio')('ACe793f04f0f71ee5bbc36fe2f877a18fd','e1244f47a9f690cde1eec2a35b461cf5',{
    lazyLoading: true
  });
  var b=req.body.number;
  const a="+919010910320"
  client.messages.create({
    body:'Your account has been creted successfully',
    to:b,
    from:'+16626726609'
    
  })
  res.send('message send successfully');
});
const PORT=5000;
app.listen(PORT,()=>{
  console.log('App is listening at port ');
})



