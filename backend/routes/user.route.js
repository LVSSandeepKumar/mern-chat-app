import { Router } from "express";
import {protectRoute} from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

//Setup router
const router = Router();

//Routes
router.get("/", protectRoute, getUsersForSidebar)

export default router;