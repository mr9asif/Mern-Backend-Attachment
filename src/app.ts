import express, { NextFunction, Request, Response } from "express";
import { UserRoutes } from "./module/User/user.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

// Root route with Postman reference
app.get("/", (_req: Request, res: Response) => {
  res.json("server working well")
});

// Application Routes
app.use("/api/v1/users", UserRoutes);
app.use("/api/users", UserRoutes);

// 404 Route Not Found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Global Error Handler:", err);

  const customError = err as { statusCode?: number; message?: string };
  const statusCode = customError.statusCode || 500;
  const message = customError.message || (err instanceof Error ? err.message : "Internal Server Error");

  // Detect MongoDB authentication or connection issues
  if (
    message.includes("AuthenticationFailed") ||
    message.includes("SCRAM failure") ||
    message.includes("bad auth") ||
    message.includes("<db_username>")
  ) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Database Authentication Error: Please ensure DATABASE_URL in your .env contains valid MongoDB username and password.",
      error: message,
    });
    return;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
