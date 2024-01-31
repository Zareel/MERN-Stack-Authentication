import express from "express";
import { signUp } from "../controllers/authControllers.js";

const router = express.Router();

//routes
//signUp || method:post || /api/v1/auth/signup
router.post("/signup", signUp);

export default router;
