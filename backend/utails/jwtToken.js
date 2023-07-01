 exports.jwtToken=async(candidate,statusCode,res)=>{
    const token=await candidate.getJwtToken();
    if(!token){
        res.status(401).json({
            success:true,
            message:"login again"
        })
    }
res.status(statusCode).cookie('token',token,{
    expires:new Date(
        Date.now()+process.env.cookie_EXPIRE*24*60*60*1000
        ),
    httpOnly:true
}).json({
    success:true,
    token,
    candidate
})



}