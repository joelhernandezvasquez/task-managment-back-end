const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const {generateJWT} = require('../helpers/jwt');


const createUser = async (req,res = response) =>{

    const {name,email,password} = req.body;

    try{
      let user = await User.findOne({email});

      if(user){
        return res.status(400).json({
          ok:false,
          msg:'User already exist with this email'
        })
      }

      user = new User(req.body);

      // Encrypt password
   const salt = bcrypt.genSaltSync();
   user.password = bcrypt.hashSync(password,salt);
      
     await user.save();
 
     // Generate JWT
 
     const token = await generateJWT(user.id,user.name);
 
     res.status(201).json({
       ok:true,
       uid:user.id,
       name:user.name,
       token
     })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Please contact admin',
        })
    }

 }

const loginUser = async (req,res = response)=>{
    const {email,password} = req.body;

    try{
        let user = await User.findOne({email});

        if(!user){
          return res.status(400).json({
           ok:false,
           msg:'User does not exist with this email'
          })
        }
   
        const validPassword = bcrypt.compareSync(password,user.password);
   
        if(!validPassword){
           return res.status(400).json({
               ok:false,
               msg:'password is incorrect'
           })
        }
        const token = await generateJWT(user.id,user.name);
       
        res.json({
           ok:true,
           uid:user.id,
           name:user.name,
           token
        })
    }
     
     catch(error){
        console.log(error);
        return res.status(500).json(({
            ok:false,
            msg:'Please contact admin'
        }))
     }
   
  }

  const revalidateToken = async(req,res=response) =>{
    const{uid,name} = req;

    // generate a new token
    const token = await generateJWT(uid,name);

     res.json({
      ok:true,
      uid,
      name,
      token
      
    })
  }

  module.exports = {
   loginUser,
   createUser,
   revalidateToken
  }