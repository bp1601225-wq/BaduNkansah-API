import { Router } from "express";
import { UserController } from "../controller/UserController";

export const UsersRouter = Router();

// ==================== USERS ====================

// Get all users
UsersRouter.get(
  "/users",
  UserController.GetAllUser
);

// Get user by ID
UsersRouter.get(
  "/users/:id",
  UserController.GetUserById
);

// Create user
UsersRouter.post(
  "/users",
  UserController.CreateUser
);

// Update user
UsersRouter.put(
  "/users/:id",
  UserController.UpdateUser
);

// Delete user
UsersRouter.delete(
  "/users/:id",
  UserController.DeleteUser
);