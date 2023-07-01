const express=require('express');
const errorMiddlewares=require("./middlewares/error")
const cookieParser=require('cookie-parser')
 const app= express();
 const db=require('./config/datatBase');
 app.use(express.json());
 app.use(cookieParser());
 const route=require("./routes/productRoutes");
//  const UserRoute=require("");
const routes = require('./routes/userRoutes');
 app.use("/api/v1",route);
 app.use("/api/v1",routes);
 app.use(errorMiddlewares);
//  app.use()

module.exports=app;
