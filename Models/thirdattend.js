const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    rollno:{type:String,required:true},
    attend:{type:String,required:true}
});

module.exports=mongoose.model('thirdattendances',schema);