import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account!"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token")
        res.status(200).json("User has been deleted...");
    } catch (err) {
        next(err);
    }
};


export const getUserListings = async (req, res, next) => {
  try{
      if(req.user.id === req.params.id){
          const listing = await Listing.find({useRef: req.params.id})
          res.status(200).json(listing);
      }else{
          return next(errorHandler(401,"You can only view your own listings!"))
      }

  }catch(error){

  }
};

