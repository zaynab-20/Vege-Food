require("./config/dataBase");
require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const PORT = process.env.PORT || 7070;
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const paystackRouter = require('./routes/paymentRouter')
app.use(express.json());
app.use(cors());

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use('/api/v1',paystackRouter)
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
