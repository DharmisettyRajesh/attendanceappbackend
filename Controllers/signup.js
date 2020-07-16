const {validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');

const httperror = require('../Models/http-error');
const signups=require('../Models/signup.js');
const jwt=require('jsonwebtoken')

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new httperror('Invalid inputs passed, please check your data.', 422)
      );
    }
    const { name, email, password } = req.body;
  
    let existingUser;
    try {
      existingUser = await signups.findOne({ email: email });
    } catch (err) {
      const error = new httperror(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (existingUser) {
      const error = new httperror(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
    let encodedpassword ;
    try{
        encodedpassword =await bcrypt.hash(password,12)
    }
    catch(err){
      const error = new httperror(
        'password hashing failed',
        500
      )
      throw error;
    }
  
    const createdUser = new signups({
      name,
      email,
      password:encodedpassword
    });
  
    try {
      await createdUser.save();
    } catch (err) {
      const error = new httperror(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    let token;
    try{
    token=jwt.sign({userId:createdUser.id,email:createdUser.email},process.env.JWT_KEY,{expiresIn:'1h'});
    } catch (err) {
      const error = new httperror(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);

    }
    res.status(201).json( {userId:createdUser.id,email : createdUser.email,token:token}); // createdUser includes the PW
  };
  
  const login = async (req, res, next) => {
    const { email, password } = req.body;
  
    let existingUser;
  
    try {
      existingUser = await signups.findOne({ email: email });
    } catch (err) {
      const error = new httperror(
        'Loggin in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingUser ) {
      const error = new httperror(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
    let createduser=false;
    try{
      createduser =await bcrypt.compare(password,existingUser.password);
    }
    catch(err) {
      const error = new httperror(
        'password matching failed',500
      )
      throw error;
    }
    if(!createduser){
      const error = new httperror(
        'crediential are not valid',
        500
      )
    }
    let token;

    try{

        token=jwt.sign({userId:createduser.id,email:createduser.email},process.env.JWT_KEY,{expiresIn:'1h'});
    
      }
      catch (err) {
      const error = new httperror(

        'Log infailed, please try again later.',
        500
      );

      return next(error);

    }
  
    res.status(201).json({ userId:existingUser.id ,email:existingUser.email,token:token});
  };

  exports.signup=signup;
  exports.login=login;