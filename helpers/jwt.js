const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) =>{
   
    return new Promise((resolve,reject)=>{
        const payload = {uid,name};
        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn:'5d'
        },
        (err,token) =>{
           if(err){
            console.log(err);
            reject('could not generate token.')
           }
           resolve(token);
        }
        );
    })
}

module.exports = {
    generateJWT
}