const express = require('express');

const studentcontrollers=require('../Controllers/first');

const app=express.Router();

app.get('/',studentcontrollers.getStudents);
app.post('/',studentcontrollers.postStudents);

app.post('/attendance',studentcontrollers.postattendance);

module.exports=app;