const dotenv=require('dotenv');
dotenv.config({path:__dirname+"/config/config.env"})

const app=require('./app');
// const x=app.listen(process.env.PORT).then(()=>{
//  console.log()
// }).catch(()=>{

// })
//  uncaught error
process.on("uncaughtException",(err)=>{
            console.log(`error:${err.message}`)
    console.log("due to uncaught error server is shutting down");
    process.exit(1);

})
// console.log(youtube);
const server =app.listen(process.env.PORT,()=>{
        console.log(`Server is listening on port ${process.env.PORT}`);
    })
    process.on("unhandledRejection",(err)=>{
        console.log(`Error:${err.message}`);
        console.log("shutting down the server due to unhandled server error");
        server.close(()=>{
            process.exit(1);
        })
    })

    
 
   
  