const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected to DB'))
  .catch((error) => console.log('error in database connecting',error))

  app.get('/api/test',()=>{
    console.log('test is success');
  })
  app.listen(5000, () => {
  console.log("Backend server is running");
 });
