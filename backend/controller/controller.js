
const product=require("../model/productModel");
const ErrorHandler = require("../utails/errorHandler");
const func=require("../middlewares/AsyncErrorHandler");
const ApiFeature = require("../utails/search");
// -------------admin pannel -----------------
const pageLimit=5;
exports.getAllProducts=func(async(req,res)=>{

    const api=new ApiFeature(product.find(),req.query)
    .search()
    .filter()
    .pagination(pageLimit);
 const allProduct=await api.query;
 res.status(200).json({
    success:true,
    allProduct
 })
} 
)
exports.cearteProduct= func(async(req,res)=>{
    req.body.user=req.user.id
    const newProduct=await product.create(req.body);
    res.status(201).json({
        success:true, 
        newProduct
    })

})
exports.updateProduct=func(async(req,res)=>{
    // console.log("YES");
    let oldProduct=await product.findById(req.params.id);
    if(!oldProduct){ 
        res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    oldProduct=await product.findByIdAndUpdate(req.params.id,req.body,)
    res.status(200).json({
        success:true,
        oldProduct
    })
}) 
exports.deleteProduct=func(async (req,res)=>{
    // const x1=await pro duct.findById(req.params.id);
    if(!req.params.id){
        res.status(500).json({
            success:false,
            message:"Element not Found"
        }) 
    }
    else{

        const Product=await product.findByIdAndDelete(req.params.id);
        //    await Product.remove();
           res.status(200).json({
               success:true,
               message:"element removed successfully",
               Product
           })
    }
})
exports.getProductDetails=func(async(req,res,next)=>{
    const Product=await product.findById(req.params.id);
    if(!Product){
        // return next(new ErrorHandler("product not found",404))
        res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    res.status(200).json({
        success:true,
        Product
    })
})

// module.exports=getAllProducts; 