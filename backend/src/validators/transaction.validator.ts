import { z } from "zod";

export const createTransactionSchema = z.object({
    amount: z.number(),
    type: z.enum(["income", "expense"]),
    category: z.string().min(1),
    description: z.string().optional(),
    date: z.string(),
    userId: z.string().optional()
});