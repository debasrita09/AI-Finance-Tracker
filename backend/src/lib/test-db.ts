import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const transactions = await prisma.transaction.findMany();

    console.log("Database connected successfully!");
    console.log(transactions);
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });