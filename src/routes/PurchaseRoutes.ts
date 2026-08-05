import { Router } from "express";
import { PurchaseController } from "../controller/purchase_controller";

export const PurchaseRouter = Router();


// Get all purchases
PurchaseRouter.get(
  "/purchases",
  PurchaseController.GetAll
);


// Get purchase by id
PurchaseRouter.get(
  "/purchases/:id",
  PurchaseController.GetById
);


// Create purchase
PurchaseRouter.post(
  "/purchases",
  PurchaseController.Create
);


// Update purchase
PurchaseRouter.put(
  "/purchases/:id",
  PurchaseController.Update
);


// -------------- PURCHASED ITEM --------------------- //
PurchaseRouter.post("/purchase-item", PurchaseController.CreatePurchasedItem)

PurchaseRouter.get("/purchase-item", PurchaseController.GetPurchasedItem)