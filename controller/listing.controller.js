import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try{
        const result = await Listing.create(req.body);
        res.status(201).json(result);
    }catch(err){
        next(err)
    }
};

export const getUserListings = async (req, res, next) => {
    
};
