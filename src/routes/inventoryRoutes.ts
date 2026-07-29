import { Router } from "express";
import { InventoryController } from "../controller/inventory_controller";

export const InventoryRouter = Router();


// Inventory
InventoryRouter.get(
  "/inventory",
  InventoryController.getAllInventory
);


InventoryRouter.post(
  "/inventory",
  InventoryController.CreateInventory
);


InventoryRouter.put(
  "/inventory",
  InventoryController.UpdateInventory
);