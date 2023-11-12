import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
export const signup = async(req, res,next) => {
  const {username, email, password} = req.body;
  let hashedPassword;
  try{
    hashedPassword = await bcrypt.hash(password, 10);
  }catch(err){
    return next(err);
  }
  const newUser = new User({username, email, password: hashedPassword});
  try{
    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  }catch(err){
    return next(err); 
  }
}