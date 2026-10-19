import prisma from "../../prisma.js";
import { ICreateUserInput, IUpdateUserInput } from "./user.type.js";

// Helper to check MongoDB 24-character hexadecimal ObjectId
export const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// 1. Create User
const createUser = async (payload: ICreateUserInput) => {
  const { name, email } = payload;

  const trimmedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  // Check if user already exists with this email
  const existingUser = await prisma.user.findUnique({
    where: { email: trimmedEmail },
  });

  if (existingUser) {
    const error = new Error("User with this email already exists");
    (error as unknown as { statusCode: number }).statusCode = 409;
    throw error;
  }

  const result = await prisma.user.create({
    data: {
      name: trimmedName,
      email: trimmedEmail,
    },
  });

  return result;
};

// 2. Get All Users
const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return result;
};

// 3. Get Single User by ID
const getUserById = async (id: string) => {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid User ID format. Must be a 24-character hexadecimal ObjectId.");
    (error as unknown as { statusCode: number }).statusCode = 400;
    throw error;
  }

  const result = await prisma.user.findUnique({
    where: { id },
  });

  if (!result) {
    const error = new Error("User not found");
    (error as unknown as { statusCode: number }).statusCode = 404;
    throw error;
  }

  return result;
};

// 4. Update User
const updateUser = async (id: string, payload: IUpdateUserInput) => {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid User ID format. Must be a 24-character hexadecimal ObjectId.");
    (error as unknown as { statusCode: number }).statusCode = 400;
    throw error;
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    const error = new Error("User not found");
    (error as unknown as { statusCode: number }).statusCode = 404;
    throw error;
  }

  const updateData: { name?: string; email?: string } = {};

  if (payload.name !== undefined && payload.name.trim() !== "") {
    updateData.name = payload.name.trim();
  }

  if (payload.email !== undefined && payload.email.trim() !== "") {
    const newEmail = payload.email.trim().toLowerCase();
    if (newEmail !== existingUser.email) {
      // Check if new email is already in use
      const emailTaken = await prisma.user.findUnique({
        where: { email: newEmail },
      });
      if (emailTaken) {
        const error = new Error("The provided email is already in use by another user");
        (error as unknown as { statusCode: number }).statusCode = 409;
        throw error;
      }
    }
    updateData.email = newEmail;
  }

  const result = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return result;
};

// 5. Delete User
const deleteUser = async (id: string) => {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid User ID format. Must be a 24-character hexadecimal ObjectId.");
    (error as unknown as { statusCode: number }).statusCode = 400;
    throw error;
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    const error = new Error("User not found");
    (error as unknown as { statusCode: number }).statusCode = 404;
    throw error;
  }

  await prisma.user.delete({
    where: { id },
  });

  return { id, message: "User deleted successfully" };
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
