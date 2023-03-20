
const {response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req,res = response,next) =>{
  // x-token headers
  const token = req.header('x-token');

 // validate the token

 if(!token){
    return res.status(401).json({
        ok:false,
        msg:'missing token for this request.'
    })
 }

 try{
   const payload = jwt.verify(
    token,
    process.env.SECRET_JWT_SEED
   )

   req.uid = payload.uid;
   req.name = payload.name;
   
 }
 catch(error){
    return res.status(401).json({
        ok:false,
        msg:'Token is invalid'
    })
 }
  next();

}

module.exports = {
    validateJWT
}