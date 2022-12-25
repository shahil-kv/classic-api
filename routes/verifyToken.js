const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token
    if(authHeader){
        const token=authHeader.split(" ")[1]
        const secretKey=process.env.JWT_SEC
        // we split out the 2 parameters from the token into one
        // next step is we are going to check the token is working or not
       jwt.verify(token,secretKey,(err,user)=>{
        if(err) res.status(403).json('Token is not valid')
        // we get the user from using the secret key and the token they provide if that is an error then we will catch it and show to the user
         req.user=user
         next();
       })
// if the users token is not true then this is will happen example if the token is wrong
    }else{
        return res.status(401).json('You are not authenticated or if the token and the id is not provided')
    }
}
// we wnat to ask about this also
  const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
 // namuk oru id kittum from the token aa token ullaa usere namuk kittum =req.user.id
//  namuk parameter aayit thannaa idyum match anho nokkum 
        console.log(`from token${req.user.id}`)
        console.log(req.params.id)
        if(req.user.id===req.params.id || req.user.isAdmin){
           next()
        }else{
            res.status(403).json("you are not allowed to do that")
        }
    })
  }

  const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            console.log('shahil is a kiladi')
           next()
        }else{
            res.status(403).json("you are not allowed to do that")
        }
    })
  }
 
module.exports={
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}