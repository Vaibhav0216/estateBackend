import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import textRouter from "./routes/test.routes.js";
import signupRouter from "./routes/signup.routes.js";
dotenv.config({ path: ".env"});

mongoose.connect(process.env.mongoURL)
  .then(() => {
    console.log("Connected to MongoDB"); 
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
const app = express(); 
app.use(express.json());
app.use("/api/test", textRouter); 
app.use("/api/auth", signupRouter); 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT, () => { 
  console.log(`Estate server running on port ${process.env.PORT}`);
});
 