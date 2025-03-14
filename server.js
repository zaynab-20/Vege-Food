const express = require('express');
require('./config/dataBase')
require('dotenv').config();
<<<<<<< HEAD
const productRouter = require('./routes/productRouter')

=======
const express = require('express');
const userRouter= require('./routes/userRouter')
>>>>>>> 8abb047eb3bf254ec859119a0ab19a99a2693079
const PORT = process.env.PORT || 7070

const app = express()

app.use(express.json())
<<<<<<< HEAD

app.use(productRouter)
=======
app.use('/api/v1',userRouter)

>>>>>>> 8abb047eb3bf254ec859119a0ab19a99a2693079
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    
})