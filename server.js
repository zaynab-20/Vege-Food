require("./config/dataBase");
require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const PORT = process.env.PORT || 7070;
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
<<<<<<< HEAD
const paymentRouter = require("./routes/paymentRouter")

=======
const paystackRouter = require('./routes/paymentRouter')
>>>>>>> 411ca44ae3c1d0915fab3cf0caccad5c3e8e8056
app.use(express.json());
app.use(cors());

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
<<<<<<< HEAD
app.use("/api/v1", paymentRouter);

const swaggerJsdoc = require("swagger-jsdoc");
const swagger_UI = require("swagger-ui-express")

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'BASE_URL: https://swagger-app.onrender.com',
//       version: '1.0.0',
//     },
//   },
//   apis: ["./routes/*.js"], // files containing annotations as above
//   components: {securitySchemes: {BearerAuth:{type: "http", scheme: "bearer", bearerFormat: "JWT"}},security: [{BearerAuth: []}]}
// };
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BASE_URL: https://swagger-app.onrender.com',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
           bearerFormat: "JWT"
        }
      }
    }, 
    security: [{ BearerAuth: [] }]
  },
  apis: ["./routes/*.js"] // Ensure this points to the correct path
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/documentation", swagger_UI.serve, swagger_UI.setup(openapiSpecification))

// app.use((err, req, res, next)=>{
//   if (err instanceof SyntaxError) {
    
//   }
// })



app.use('/api/v1',paystackRouter)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
