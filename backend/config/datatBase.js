const mongoose=require('mongoose');


mongoose.connect(process.env.db_url,{})
.then((data)=>console.log(`connection of db is successful ${data.connection.host}`)) 