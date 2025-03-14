const express = require('express');
require('./config/dataBase')
require('dotenv').config();
const productRouter = require('./routes/productRouter')

const express = require('express');
const userRouter= require('./routes/userRouter')
const PORT = process.env.PORT || 7070

const app = express()

app.use(express.json())

app.use(productRouter)
app.use('/api/v1',userRouter)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    
})