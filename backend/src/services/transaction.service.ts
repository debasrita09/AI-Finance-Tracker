import { prisma } from "../config/prisma";

export async function getAllTransactions(
  userId: string
) {
  return prisma.transaction.findMany({
    where: {
      userId
    },

    orderBy: {
      date: "desc"
    }
  });
}

export async function createTransaction(data: {
    amount: number;
    type: string;
    category: string;
    description?: string;
    date: Date;
    userId?: string;
}) {
    return prisma.transaction.create({
        data
    });
}

export async function deleteTransaction(
  id: number,
  userId: string
) {
  return prisma.transaction.deleteMany({
    where: {
      id,
      userId
    }
  });
}

export async function updateTransaction(
    id: number,
    userId: string,
    data: {
        amount?: number;
        type?: string;
        category?: string;
        description?: string;
        date?: Date;
        userId?: string;
    }
) {
  return prisma.transaction.updateMany({
    where: {
      id,
      userId
    },

    data
  });
}