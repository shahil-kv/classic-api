
// always  remember logged in using mshahilk28@gmail.com in mongodb
const router=require('express').Router();
const User=require('../models/User')
const CryptoJs=require('crypto-js')

// REGISTER
router.post('/register', async (req,res)=>{
    const newUser= new User ({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
            ).toString(),
    });
 try{
     const  savedUser = await newUser.save()
     const shahil={username,password}=savedUser
     res.status(201).json(username)
     console.log('database is ready')
 }catch(e){
     res.status(500).json(e)
     console.log(e)
 }

});

// LOGIN

router.post('/login', async (req,res)=>{
    try{
    // we are getting the user from the find one method and we will get the full user from that username
        const user=await User.findOne({username:req.body.username});
        !user && res.status(401).json('Wrong credentials')
// then we will get the database password and everything about the user then we will try to decrypt using the env code
        const hashedPassword=CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC);
        console.log(hashedPassword)
        // teh password will be in quotes And changed the password from the db  into string 
        const password=hashedPassword.toString(CryptoJs.enc.Utf8 )
        console.log(password)
        password !==req.body.password  && res.status(401).json('wrong credientials')
    res.status(200).json(user)
    }catch(err){
    res.status(500).json(err)
    } 
})


module.exports=router;

