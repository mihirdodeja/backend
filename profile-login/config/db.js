const { default: mongoose } = require("mongoose")

const dbConfig=()=>
{
    mongoose.connect(process.env.MONGO_URL);
   try
   {
     console.log("MONGO DB CONNECTED");
   }
   catch(err)
   {
    console.log(err);
   }
}

module.exports=dbConfig