// api/index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
 
// Load environment variables from .env file
dotenv.config({ path: ".env"});

// Print the value of mongoURL to the console
console.log("MongoURL:", process.env.mongoURL);

// Connect to MongoDB
mongoose.connect(process.env.mongoURL)
  .then(() => {
    console.log("Connected to MongoDB"); 
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Create an Express app
const app = express();

// Start the Express app and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Estate server running on port ${process.env.PORT}`);
});
