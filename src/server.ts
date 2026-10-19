import "dotenv/config";
import app from "./app.js";
import prisma from "./prisma.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("Connecting to database using Prisma...");
    await prisma.$connect();
    console.log("✅ Successfully connected to MongoDB database using Prisma!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

startServer();

export { prisma };
