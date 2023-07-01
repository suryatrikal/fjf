const mongoose=require('mongoose');
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const userSchema=new mongoose.Schema({
     name:{
        type:String,
        required:[true,"please Enter Your Name"]
     },
     email:{
        type:String, 
        required:[true,"please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Email is not Valid"]

     },
     password:{
        type:String,
        required:[true,"please Enter Your Password"],
        minLenth:[6,"password Length should be more then 6"],
        select:false,
     },
     avetar:{
        
            public_id: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          
     },
     role:{
        type:String,
        default:"user"
     },
     resetPasswordToken:String,
     resetPasswordExpire:Date,


});
userSchema.methods.getResetPasswordToken=async function (){
   console.log('yes');
   const randomToken=crypto.randomBytes(20).toString('hex');
   this.resetPasswordToken=await crypto.createHash('sha256').
                                     update(randomToken).
                                          digest('hex');
this.resetPasswordExpire=Date.now()+10*60*1000;         
   return randomToken;
}
userSchema.pre('save',async function(next){ 
   if(!this.isModified(this.password)){
       next();
   }
          this.password=await bcrypt.hash(this.password,10);
          next();

})
userSchema.methods.getJwtToken=function(){
   // console.log('yes')
    return jwt.sign({id:this._id},process.env.SECRET_KEY,{
      expiresIn:process.env.Expire_time,
    });
};

userSchema.methods.comparePassword=function(password){
      return bcrypt.compare(password,this.password);
} 
 

module.exports=mongoose.model("user",userSchema); 