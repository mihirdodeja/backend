const { default: mongoose, Error } = require("mongoose")

const dbConfig=()=>
{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>
    {
        console.log("MongoDB Connected")
    })
    // .catch(err)
    // {
    //     console.log(err)
    // }
}

module.exports=dbConfig;