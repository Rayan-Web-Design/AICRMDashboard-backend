import { Router } from "express";
import { getOverview } from "../controllers/analytic.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);
router.get("/overview", getOverview);
export default router;
