import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return next(err);
  }
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (err) { 
    return next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found."));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign(
      { email: validUser.email, id: validUser._id },
      process.env.JWT_SECRET
    );
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(validUser);
  } catch (err) {
    return next(err);
  }
};

export const google = async (req, res, next) => {
  try{
    const user = await User.findOne({ email: req.body.email });
    if(user){
      const {password, ...rest} = user._doc;
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
      );
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo
      });
      const savedUser = await newUser.save();
      const {password, ...rest} = savedUser._doc;
      const token = jwt.sign(
        { id: savedUser._id },
        process.env.JWT_SECRET
      );
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  }catch(err){
    console.log("Error in google auth")
    return next(err);
  }
}; 

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User signed out successfully." );
  } catch (err) {
    return next(err);
  }
};