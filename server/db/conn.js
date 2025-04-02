const mongoose = require("mongoose");

const DB = "////" 

mongoose.connect(DB,
    
    // useCreateIndex:true,
    // useFindAndModify:false,
    //  useNewUrlParser:true,
    //  useUnifiedTopology:true 

).then(() => console.log("connection start")).catch((error)=> console.log("error.message"));
