const express = require('express');

const studentcontrollers=require('../Controllers/signup');

const app=express.Router();


app.post('/signup',studentcontrollers.signup);

app.post('/login',studentcontrollers.login);

module.exports=app;