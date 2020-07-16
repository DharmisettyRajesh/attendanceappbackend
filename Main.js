const express = require('express');
const mongoose = require('mongoose');
const bodyparser=require('body-parser');

const httperror = require('./Models/http-error.js');
const first= require('./Routes/firstyear.js');
const second= require('./Routes/secondyear.js');
const third= require('./Routes/thirdyear.js');
const fourth= require('./Routes/fourthyear.js');
const authorization=require('./Routes/signup.js');


const app = express();

app.use(bodyparser.json());
app.use(express.static(path.json('public')));

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
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-grn1p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true}
    
  )
  .then(()=>{
      app.listen(process.env.PORT || 5000);
      console.log('connected');
  })
  .catch(()=>{
      console.log('error')
  });


