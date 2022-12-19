const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute=require('./routes/user')

dotenv.config();

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected to DB'))
  .catch((error) => console.log('error in database connecting',error))

//   what we are doing here is seting the api/user and the userRoute for showing 
// we can use the other routes using the api/user/and then if we put any of the links it will go to userRoute and if there is a link then it will be collected
  app.use(express.json())
  app.use('/api/users',userRoute)

  app.listen(5000, () => {
  console.log("Backend server is running");
 });
