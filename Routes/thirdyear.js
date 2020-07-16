const express = require('express');

const studentcontrollers=require('../Controllers/third');

const app=express.Router();

app.get('/',studentcontrollers.getStudents);
app.post('/',studentcontrollers.postStudents);

app.post('/attendance',studentcontrollers.postattendance);

module.exports=app;