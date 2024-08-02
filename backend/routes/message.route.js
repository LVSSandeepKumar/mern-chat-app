import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";

//Set up router
const router = Router();

//Routes
router.post("/send/:id", sendMessage)

export default router;