import { Request, Response } from "express";
import { RoleServices } from "../services/Settings/RoleBased/Roles";
import ResponseWork from "../utilityResponse/Response";
import { RBAC } from "../services/Settings/RoleBased/RBACModel";

// Prisma Model
const role = RBAC.roles;

export const RolesController = {
  async GetAllRoles(req: Request, res: Response) {
    try {
      const allRoles = await RoleServices.getAll(role);


      return ResponseWork.SuccessResponse(
        200,
        "Roles retrieved successfully.",
        allRoles,
        res
      );
    } catch (error: any) {
      console.error(error);

      return ResponseWork.FailureResponse(
        500,
        error.message || "Failed to retrieve roles.",
        res
      );
    }
  },

  async CreateRoles(req: Request, res: Response) {
    try {
      const incomingData = req.body;

      const newRole = await RoleServices.create(role, incomingData);

      return ResponseWork.SuccessResponse(
        201,
        "Role created successfully.",
        newRole,
        res
      );
    } catch (error: any) {
      console.error(error);

      return ResponseWork.FailureResponse(
        500,
        error.message || "Failed to create role.",
        res
      );
    }
  },

  async UpdateRoles(req: Request, res: Response) {
    try {
      const incomingData = req.body;
console.log(incomingData)

      const updatedRole = await RoleServices.update(
        role,
        incomingData
      );

      return ResponseWork.SuccessResponse(
        200,
        "Role updated successfully.",
        updatedRole,
        res
      );
    } catch (error: any) {
      console.error(error);

      return ResponseWork.FailureResponse(
        500,
        error.message || "Failed to update role.",
        res
      );
    }
  },

  async DeleteRoles(req: Request, res: Response) {
    try {
      const { id } = req.params ;

      const deletedRole = await RoleServices.delete(role, id as string);

      return ResponseWork.SuccessResponse(
        200,
        "Role deleted successfully.",
        deletedRole,
        res
      );
    } catch (error: any) {
      console.error(error);

      return ResponseWork.FailureResponse(
        500,
        error.message || "Failed to delete role.",
        res
      );
    }
  },
};