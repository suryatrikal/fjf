const mongoose=require('mongoose');


const newschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"plz enter name first"]
    },
    discription:{
        type:String,
        required:[true,"enter discription"],

    },
    price:{
        type:Number,
        required:[true,"plz enter price value"],
        maxLength:[8,"write proper price value"]

    },
    ratings: {
        type: Number,
        default: 0,
      },
      images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      category: {
        type: String,
        required: [true, "Please Enter Product Category"],
      },
      Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
      },
      numOfReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
    
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
 
})
module.exports=mongoose.model("product",newschema);