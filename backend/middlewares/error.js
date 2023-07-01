const ErrorHandler=require("../utails/errorHandler")
module.exports=(err,req,res,next)=>{
err.statusCode=err.statusCode||500;  
err.message=err.message||"server error";
res.status(err.statusCode).json({
    sucess:false,
    error:err,
});
}