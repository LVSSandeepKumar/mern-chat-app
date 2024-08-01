import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

// Set up Router
const router = Router();

// Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;