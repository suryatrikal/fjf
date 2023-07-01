const User=require('../model/userSchema')
const func=require("../middlewares/AsyncErrorHandler");
const { jwtToken } = require('../utails/jwtToken');
const mailsender=require('../utails/mailsender')

exports.Register=func(async(req,res)=>{
    // console.log("YES");
    const {name,email,password}= req.body;
       const user=await User.create({
        name,email,password,
        avetar:{
            public_id:"this is sample id",
              url: "this is sample url"
        },

       }) 

       const token=user.getJwtToken();
       console.log(token)
       jwtToken(user,201,res);
       
});

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({
      success: false,
      message: "Please enter email and password",
    });
    return;
  }

  const candidate = await User.findOne({ email }).select("+password");
  if (!candidate) {
    res.status(401).json({
      success: false,
      message: "Please enter correct email or password",
    });
    return;
  }

  const resetToken = candidate.getResetPasswordToken(); // Call the method without parentheses

  const isMatched = await candidate.comparePassword(password);
  if (!isMatched) {
    res.status(401).json({
      success: false,
      message: "Please enter correct email or password",
    });
    return;
  }

  const token = candidate.getJwtToken();
  // console.log(token);
  jwtToken(candidate, 200, res);
};


// log out

exports.loggOut=func(async(req,res,next)=>{
  // console.log('yes');
  // req.cookie("token",null,{
  // expires:new Date(Date.now()),
  // httpOnly:true,
  // })
  res.cookie('token',null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  })
  res.status(200).json({
    success:true,
    message:"you have been logout successfully login again to access website"
  })
})

//                forgotten password
 
exports.forgetPassword = func(async (req, res, next) => {
  const { email } = req.body;

   
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User does not exist",
      });
    }

    const resetToken = user.getResetPasswordToken();
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `This is the URL for password recovery: \n \n ${resetPasswordUrl} \n \n If you have not requested this, please ignore it as spam.`;
    user.save({validateBeforeSave:false})
    try {
      console.log("tyeye");
      await mailsender({
        
        email:req.body.email,
        subject: "Password Recovery Email",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Mail has been sent successfully to ${email}`,
      });

    } 
     catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      user.save({validateBeforeSave:false})
      res.status(404).json({
        success:false,
        error:error.message
      })
      

    }

  })

