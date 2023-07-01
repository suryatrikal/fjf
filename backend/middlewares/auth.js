const User=require("../model/userSchema")
// c
const func=require('../middlewares/AsyncErrorHandler')
const jwt=require('jsonwebtoken')

exports.userAuth=func(async(req,res,next)=>{
 const {token}=req.cookies;
//  console.log(token);
 if(!token){
    //  console.log('yes')
    res.status(401).json({
        success:false,
        message:"you don't have rights to access this resourse"
    })
    // next();
 }  
 const decodedId=jwt.verify(token,process.env.SECRET_KEY);
 req.user=await User.findById(decodedId.id);
 next();
})
exports.Rolecheceker=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
    console.log('yes form Rolecheceker');
    res.status(403).json({
        success:false,
        message:"you are not allowed to axcess this facility"
    })
         
    } 

next();
}
}
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.userAuth = async (req, res, next) => {
//   const { token } = req.cookies;

//   try {
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "You don't have rights to access this resource",
//       });
//     }

//     const decodedId = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = await User.findById(decodedId.id);
//     next();
//   } catch (error) {
//     // Handle the error when token verification fails
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid token',
//     });
//   }
// };