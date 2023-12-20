import express from "express";
import { createListing, getUserListings } from "../controller/listing.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create",verifyUser,createListing);
router.get("/all-listings",verifyUser,getUserListings)

export default router;