const express = require('express');
require('./config/dataBase')
require('dotenv').config();
const cors = require('cors')

const PORT = process.env.PORT || 7070
const userRouter= require('./routes/userRouter')
const productRouter = require('./routes/productRouter')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1', productRouter)
app.use('/api/v1',userRouter)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    
})