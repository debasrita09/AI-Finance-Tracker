import { Router } from "express";
import { getTransactions, addTransaction, removeTransaction, editTransaction } from "../controllers/transaction.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/",requireAuth(), getTransactions);

router.post("/", requireAuth(), addTransaction);

router.delete("/:id", requireAuth(), removeTransaction);

router.put("/:id", requireAuth(), editTransaction);

export default router;
