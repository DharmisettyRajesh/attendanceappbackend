const {validationResult}=require('express-validator');

const httperror=require('../Models/http-error');
const secondyears=require('../Models/secondschema');
const secondattendances=require('../Models/secondattend');


const getStudents=async(req,res,next) =>{
    let students;
    try{
        students=await secondyears.find();
    }
    catch(err){
        const error=new httperror(
            'fetching users failed',500
        )
        throw error;
    }

    res.json({students:students.map(student=>student.toObject({getters:true}))});
}

const postStudents=async(req,res,next)=>{
    const  errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new httperror(
            'invalid inputs passed',500
        )
        throw error;
    }
    const {name,rollno,address,email,caption,image}=req.body;
    let existingstudent;
    try{
        existingstudent=await secondyears.findOne({rollno:rollno});

    }
    catch(err){
        return next(
            new httperror('student already existed',500)
        )
    }
    const createdstudent=new secondyears({
        name,
        rollno,
        address,
        email,
        caption,
        image
    })
    try {
        await createdstudent.save();
    }
    catch(err){
        return next(
            new httperror('saving students failed',500)
        )
    }

 res.status(200).json({student:createdstudent})
}

const postattendance = async(req,res,next)=>{
    const  errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new httperror(
            'invalid inputs passed',500
        )
        throw error;
    }
    const {rollno,attend}= req.body;
    const postattendance=new secondattendances({
        rollno,
        attend
    })
    try{
     await   postattendance.save();
    }
    catch(err){
        return next(
            new httperror('saving students failed',500)
        )
    }
    res.status(200).json({attendance:postattendance})
}

exports.getStudents=getStudents;
exports.postStudents=postStudents;
exports.postattendance=postattendance;

