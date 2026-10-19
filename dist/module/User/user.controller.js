import { UserService } from "./user.service.js";
// Helper to format error response
const handleError = (error, res) => {
    console.error("User Controller Error:", error);
    const customError = error;
    const message = customError.message || (error instanceof Error ? error.message : "Something went wrong");
    const statusCode = customError.statusCode || 500;
    // Detect MongoDB authentication or connection issues
    if (message.includes("AuthenticationFailed") ||
        message.includes("SCRAM failure") ||
        message.includes("bad auth") ||
        message.includes("<db_username>")) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Database Authentication Error: Please ensure DATABASE_URL in your .env contains valid MongoDB username and password.",
            error: message,
        });
    }
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
};
// 1. Create User
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Name is required and must be a valid string",
            });
        }
        if (!email || typeof email !== "string" || !email.trim()) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Email is required and must be a valid string",
            });
        }
        const result = await UserService.createUser({ name, email });
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User created successfully",
            data: result,
        });
    }
    catch (error) {
        return handleError(error, res);
    }
};
// 2. Get All Users
const getAllUsers = async (_req, res) => {
    try {
        const result = await UserService.getAllUsers();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Users fetched successfully",
            meta: {
                total: result.length,
            },
            data: result,
        });
    }
    catch (error) {
        return handleError(error, res);
    }
};
// 3. Get Single User by ID
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await UserService.getUserById(id);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return handleError(error, res);
    }
};
// 4. Update User
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email } = req.body;
        if (!name && !email) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please provide at least one field (name or email) to update",
            });
        }
        const result = await UserService.updateUser(id, { name, email });
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User updated successfully",
            data: result,
        });
    }
    catch (error) {
        return handleError(error, res);
    }
};
// 5. Delete User
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await UserService.deleteUser(id);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
            data: result,
        });
    }
    catch (error) {
        return handleError(error, res);
    }
};
export const UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
