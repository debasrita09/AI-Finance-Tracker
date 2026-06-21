"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransactions = getAllTransactions;
exports.createTransaction = createTransaction;
exports.deleteTransaction = deleteTransaction;
exports.updateTransaction = updateTransaction;
const prisma_1 = require("../config/prisma");
async function getAllTransactions(userId) {
    return prisma_1.prisma.transaction.findMany({
        where: {
            userId
        },
        orderBy: {
            date: "desc"
        }
    });
}
async function createTransaction(data) {
    return prisma_1.prisma.transaction.create({
        data
    });
}
async function deleteTransaction(id, userId) {
    return prisma_1.prisma.transaction.deleteMany({
        where: {
            id,
            userId
        }
    });
}
async function updateTransaction(id, userId, data) {
    return prisma_1.prisma.transaction.updateMany({
        where: {
            id,
            userId
        },
        data
    });
}
