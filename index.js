import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import signupRouter from "./routes/auth.routes.js";
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
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Welcome to Estate API");
});
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
 