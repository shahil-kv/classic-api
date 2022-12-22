const jwt=require('jsonwebtoken');

const verifyToken=(req,res)=>{
    const authHeader=req.headers.token
    if(authHeader){
         jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("token is not valid")
            req.user=user
         })
    }else{
        return res.status(401).json('You are not authenticated')
    }
}