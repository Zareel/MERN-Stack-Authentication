import express from "express";
import { login, signUp } from "../controllers/authControllers.js";

const router = express.Router();

//routes
//signUp || method:post || /api/v1/auth/signup
router.post("/signup", signUp);

//login || method:post || /api/v1/auth/login
router.post("/login", login);

export default router;
