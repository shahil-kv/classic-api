const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute=require('./routes/user')
const authRoute=require('./routes/auth')
const productRoute=require('./routes/product')
const cartRoute=require('./routes/cart')
const orderRoute = require("./routes/order");
dotenv.config();

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected to DB'))
  .catch((error) => console.log('error in database connecting',error))

//   what we are doing here is seting the api/user and the userRoute for showing 
// we can use the other routes using the api/user/and then if we put any of the links it will go to userRoute and if there is a link then it will be collected
  app.use(express.json())
  // This is the user Router we need to done
  app.use('/api/users',userRoute);
  app.use('/api/auth',authRoute );
  app.use('/api/products',productRoute)
  app.use('/api/cart',cartRoute)
  app.use('/api/orders',orderRoute)
  app.listen(5000, () => {
  console.log("Backend server is running on port 5000");
 });
