import express from "express";
import cors from "cors";

import transactionRoutes from "./routes/transaction.routes";
import aiRoutes from "./routes/ai.routes";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use("/transactions",
    transactionRoutes
);
app.use(
  "/ai-insights",
  aiRoutes
);



export default app;