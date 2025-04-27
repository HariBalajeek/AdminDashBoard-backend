const mongoose = require('mongoose');

//creating the schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true,
        validate:{
            validator: function(v){
              return  /^[a-zA-Z0-9_]{3,}$/.test(v)
            },
        message: props => `${props.value} is not a valid name`
        }
    },
    password:{
        type:String,
        required:true,
        validate:{
                validator: function(v){
                    return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v)
                },
                message: props => `${props.value} is not a valid password`
        }
    }
})

//creating the model
const User = mongoose.model('User',userSchema)

//exporting the model
module.exports = User