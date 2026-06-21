"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
