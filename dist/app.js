import express from "express";
import { UserRoutes } from "./module/User/user.route.js";
const app = express();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Enable CORS
app.use((req, res, next) => {
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
app.get("/", (_req, res) => {
    res.json({
        status: "ok",
        message: "User CRUD API is running!",
        endpoints: {
            createUser: "POST   http://localhost:5000/api/users (or /api/v1/users)",
            getAllUsers: "GET    http://localhost:5000/api/users (or /api/v1/users)",
            getUserById: "GET    http://localhost:5000/api/users/:id",
            updateUser: "PATCH  http://localhost:5000/api/users/:id (or PUT)",
            deleteUser: "DELETE http://localhost:5000/api/users/:id",
        },
        sampleCreatePayload: {
            name: "John Doe",
            email: "john@example.com",
        },
    });
});
// Application Routes
app.use("/api/v1/users", UserRoutes);
app.use("/api/users", UserRoutes);
// 404 Route Not Found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
});
// Global Error Handler
app.use((err, _req, res, _next) => {
    console.error("Global Error Handler:", err);
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({
        success: false,
        statusCode: 500,
        message: errorMessage,
    });
});
export default app;
