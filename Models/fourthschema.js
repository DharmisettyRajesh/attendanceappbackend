const mongoose=require('mongoose');

const schea=new mongoose.Schema(
    { 
        name:{ type:String,required:true},
        rollno:{type:String,required:true},
        address:{type:String,required:true},
        email:{type:String,required:true},
        caption:{type:String,required:true},
        image:{type:String,required:true}


}
    
);

module.exports=mongoose.model('fourthyears',schea);