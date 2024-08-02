import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

//Set up router
const router = Router();

//Routes
router.post("/send/:id",protectRoute, sendMessage);

export default router;