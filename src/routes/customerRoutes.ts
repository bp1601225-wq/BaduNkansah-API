import { Router } from "express";
import { CustomerController } from "../controller/customer_controller";

export const CustomerRouter = Router();

CustomerRouter.get("/customers", CustomerController.getAllCustomers);

CustomerRouter.get("/customers/:id", CustomerController.GetCustomerById);

CustomerRouter.post("/customers", CustomerController.CreateCustomer);

CustomerRouter.put("/customers", CustomerController.UpdateCustomer);

CustomerRouter.delete("/customers/:id", CustomerController.DeleteCustomer);