import express from "express";
import { addContribution, getContributions } from "../controllers/updatecontributionController.js";

const router = express.Router();

// Add a new contribution
router.post("/contribution-history", addContribution);

// Get all contributions
router.get("/contribution-history", getContributions);

export default router;
