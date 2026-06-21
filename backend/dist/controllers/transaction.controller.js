"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = getTransactions;
exports.addTransaction = addTransaction;
exports.removeTransaction = removeTransaction;
exports.editTransaction = editTransaction;
const transaction_service_1 = require("../services/transaction.service");
const express_1 = require("@clerk/express");
async function getTransactions(req, res) {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        console.log("Requested user:", userId);
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const transactions = await (0, transaction_service_1.getAllTransactions)(userId);
        console.log("Returned transactions:", transactions.map(t => ({
            id: t.id,
            category: t.category,
            userId: t.userId
        })));
        res.status(200).json(transactions);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch transactions"
        });
    }
}
async function addTransaction(req, res) {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const transaction = await (0, transaction_service_1.createTransaction)({
            ...req.body,
            userId,
            date: new Date(req.body.date)
        });
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create transaction"
        });
    }
}
async function removeTransaction(req, res) {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const id = Number(req.params.id);
        await (0, transaction_service_1.deleteTransaction)(id, userId);
        res.status(200).json({
            message: "Transaction deleted"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete transaction"
        });
    }
}
async function editTransaction(req, res) {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const id = Number(req.params.id);
        const transaction = await (0, transaction_service_1.updateTransaction)(id, userId, {
            ...req.body,
            date: req.body.date
                ? new Date(req.body.date)
                : undefined
        });
        res.status(200).json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update transaction"
        });
    }
}
