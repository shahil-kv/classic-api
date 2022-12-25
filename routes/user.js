const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router=require('express').Router();

 router.put("/:id",verifyTokenAndAuthorization, async (req,res)=>{
      if(req.body.password){
        const cipher = crypto.createCipher(algorithm, key);
        const encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
       req.body.password=encrypted;
      }

      try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true}
        );
        res.status(200).json(updatedUser)
      }catch(err){
        res.status(500).json(err)
      }
 })

module.exports=router


