import { Router } from "express";
import { RolesController } from "../controller/role_controller";

const RolesRouter = Router();

RolesRouter.get("/roles", RolesController.GetAllRoles);

RolesRouter.post("/roles", RolesController.CreateRoles);

// update routes
RolesRouter.put("/roles", RolesController.UpdateRoles);

RolesRouter.delete("/roles/:id", RolesController.DeleteRoles);

export default RolesRouter;