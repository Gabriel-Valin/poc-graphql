import { PrismaClient } from "@prisma/client";

export class DatabaseConnection {
    static connection = new PrismaClient();
}