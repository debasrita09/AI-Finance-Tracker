import { Request, Response } from "express";
import { getAllTransactions, createTransaction, deleteTransaction, updateTransaction } from "../services/transaction.service";
import { getAuth } from "@clerk/express";
export async function getTransactions(
    req: Request,
    res: Response
) {
    try {
        const { userId } = getAuth(req);

        console.log("Requested user:", userId);
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const transactions =
            await getAllTransactions(userId);

        console.log(
            "Returned transactions:",
            transactions.map(t => ({
                id: t.id,
                category: t.category,
                userId: t.userId
            }))
        );

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch transactions"
        });
    }
}

export async function addTransaction(
    req: Request,
    res: Response
) {
    try {

        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const transaction =
            await createTransaction({
                ...req.body,
                userId,
                date: new Date(req.body.date)
            });

        res.status(201).json(transaction);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create transaction"
        });

    }
}
export async function removeTransaction(
  req: Request,
  res: Response
) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const id = Number(req.params.id);

    await deleteTransaction(
      id,
      userId
    );

    res.status(200).json({
      message: "Transaction deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to delete transaction"
    });
  }
}
export async function editTransaction(
  req: Request,
  res: Response
) {
  try {

    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const id = Number(req.params.id);

    const transaction =
      await updateTransaction(
        id,userId, {
                ...req.body,
                date: req.body.date
                    ? new Date(req.body.date)
                    : undefined
            }
      );

    res.status(200).json(transaction);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update transaction"
    });
  }
}