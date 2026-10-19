import { PrismaClient } from "@prisma/client";
import config from "./config/prisma.js";
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ||
    new PrismaClient({
        datasourceUrl: config.database_url,
    });
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
export default prisma;
