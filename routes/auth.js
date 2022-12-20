
// always  remember logged in using mshahilk28@gmail.com in mongodb
const router=require('express').Router();
const User=require('../models/User')
// REGISTER
router.post('/register', async (req,res)=>{
    const newUser= new User ({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    });
 try{
     const  savedUser = await newUser.save()
     res.status(201).json(savedUser)
     console.log('database is ready')
 }catch(e){
     res.status(500).json(e)
     console.log(e)
 }

});

module.exports=router;

