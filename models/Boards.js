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

    tasks:[
        {
            name:{
                type:String
            },
            description:{
                type:String
            },
            substasks:[{
            
                name: {
                  type: String,
                  require:true
                },
                complete: {
                  type: Boolean,
                  require:true
                }
              }]
               ,
            status:{
                type:String
            }
        }
    ]
      
    ,

     user:{
        type:String,
        required:true
     }

})

module.exports = model('Board',BoardSchema);