const {Schema,model}  = require('mongoose');

const BoardSchema = Schema({
    name:{ 
        type:String,
        required:true,
        unique:true
    },
    columns:{
     type:[String],
     required:true,
    },

     user:{
        type:String,
        required:true
     }

    // user:{
    //     type:Schema.Types.ObjectId,
    //     ref:'User',
    //     required:true
    // }
   

})

module.exports = model('Board',BoardSchema);