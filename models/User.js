const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
        username:{type:String,required:true,unique:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        isAdmin:{
            type:Boolean,
            default:false,
        } ,

    }, {timestamps:true} )

    module.exports=mongoose.model('User',userSchema);

    // definiction of what we are doing inside this we are creating a userSchema 
    // this defines what all things we need to be in the Userschema and i defined
    // we need a username and email and password and there is is admin false 
    // what all things we need if we want a user to 