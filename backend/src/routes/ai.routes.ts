import { Router }
from "express";

import {
  getAIInsights
}
from "../controllers/ai.controller";

const router = Router();

router.post(
  "/",
  getAIInsights
);

export default router;