import { Request, Response } from "express";
import { UserService } from "../services/Users/UserService";
import ResponseWork from "../utilityResponse/Response";

export const UserController = {
  async GetAllUser(req: Request, res: Response) {
    try {
      const allUsers = await UserService.GetAllUser();

      return ResponseWork.SuccessResponse(
        200,
        "Users retrieved successfully.",
        allUsers,
        res
      );
    } catch (error: any) {
      console.error(error);

      return ResponseWork.FailureResponse(
        500,
        error.message || "Failed to retrieve users.",
        res
      );
    }
  },

  async GetUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserService.GetUserById(id as string);

      return ResponseWork.SuccessResponse(
        200,
        "User retrieved successfully.",
        user,
        res
      );
    } catch (error: any) {
      console.error(error);

      return ResponseWork.FailureResponse(
        500,
        error.message || "Failed to retrieve user.",
        res
      );
    }
  },

  async CreateUser(req: Request, res: Response) {
    try {
      const incomingData = req.body;

      const newUser = await UserService.CreateUser(incomingData);

      return ResponseWork.SuccessResponse(
        201,
        "User created successfully.",
        newUser,
        res
      );
    } catch (error: any) {
      console.error(error);

      return ResponseWork.FailureResponse(
        500,
        error.message || "Failed to create user.",
        res
      );
    }
  },

  async UpdateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const incomingData = req.body;

      console.log(incomingData);

      const updatedUser = await UserService.UpdateUser(
        id as string,
        incomingData
      );

      return ResponseWork.SuccessResponse(
        200,
        "User updated successfully.",
        updatedUser,
        res
      );
    } catch (error: any) {
      console.error(error);

      return ResponseWork.FailureResponse(
        500,
        error.message || "Failed to update user.",
        res
      );
    }
  },

  async DeleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedUser = await UserService.DeleteUser(id as string);

      return ResponseWork.SuccessResponse(
        200,
        "User deleted successfully.",
        deletedUser,
        res
      );
    } catch (error: any) {
      console.error(error);

      return ResponseWork.FailureResponse(
        500,
        error.message || "Failed to delete user.",
        res
      );
    }
  },
};