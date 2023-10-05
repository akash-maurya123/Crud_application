const mongoose = require("mongoose");

const DB = "mongodb+srv://akashmaurya775395:Akash123@cluster0.gskvsss.mongodb.net/myData?retryWrites=true&w=majority" 

mongoose.connect(DB,
    
    // useCreateIndex:true,
    // useFindAndModify:false,
    //  useNewUrlParser:true,
    //  useUnifiedTopology:true 

).then(() => console.log("connection start")).catch((error)=> console.log("error.message"));