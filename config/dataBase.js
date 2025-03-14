require('dotenv').config()

const mongoose = require('mongoose');
const DB = process.env.MONGODB_URI

mongoose.connect(DB)

.then(()=>{
    console.log('connection to dataBase established succefully');
})

.catch((error)=>{

    console.log('error connecting to database: ', + error.message);
    
})