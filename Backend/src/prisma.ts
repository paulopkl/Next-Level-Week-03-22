import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ["query"], // it return an console.log() in query format of each operation on DB
});
