import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserService } from "./user.service.js";
// 1. Create User
const createUser = catchAsync(async (req, res) => {
    const { name, email } = req.body;
    if (!name || typeof name !== "string" || !name.trim()) {
        const error = new Error("Name is required and must be a valid string");
        error.statusCode = 400;
        throw error;
    }
    if (!email || typeof email !== "string" || !email.trim()) {
        const error = new Error("Email is required and must be a valid string");
        error.statusCode = 400;
        throw error;
    }
    const result = await UserService.createUser({ name, email });
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: result,
    });
});
// 2. Get All Users
const getAllUsers = catchAsync(async (_req, res) => {
    const result = await UserService.getAllUsers();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users fetched successfully",
        meta: {
            total: result.length,
        },
        data: result,
    });
});
// 3. Get Single User by ID
const getUserById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserService.getUserById(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
});
// 4. Update User
const updateUser = catchAsync(async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    if (!name && !email) {
        const error = new Error("Please provide at least one field (name or email) to update");
        error.statusCode = 400;
        throw error;
    }
    const result = await UserService.updateUser(id, { name, email });
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: result,
    });
});
// 5. Delete User
const deleteUser = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserService.deleteUser(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
});
export const UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
