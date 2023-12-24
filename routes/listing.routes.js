import express from "express";
import { createListing, deleteListing, getListing, updateListing } from "../controller/listing.controller.js";             
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create",verifyUser,createListing);
router.delete("/delete/:id",verifyUser,deleteListing);
router.post("/update/:id",verifyUser, updateListing);  
router.get("/get/:id", getListing);  
export default router;                              