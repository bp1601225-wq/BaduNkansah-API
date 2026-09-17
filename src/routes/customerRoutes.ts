import { Router } from "express";
import { CustomerController } from "../controller/customer_controller";

export const CustomerRouter = Router();

CustomerRouter.get("/customers", CustomerController.getAllCustomers);

//  fetch customers with sales
CustomerRouter.get("/customer-with-sales", CustomerController.FetchCustomerWithSales)

CustomerRouter.get("/customers/:id", CustomerController.GetCustomerById);

CustomerRouter.post("/customers", CustomerController.CreateCustomer);

CustomerRouter.put("/customers", CustomerController.UpdateCustomer);

CustomerRouter.delete("/customers/:id", CustomerController.DeleteCustomer);

 