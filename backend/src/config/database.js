require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.MONGO_URI)
function connecttodb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("connected to database")
    })
   .catch((err) => {
            console.log("Error connecting to database");
            console.log(err);
    })
}

module.exports=connecttodb