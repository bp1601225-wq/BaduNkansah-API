import { Router } from "express";
import { EmployeeController } from "../controller/employee_controller";

const EmployeeRouter = Router();


// Get all employees
EmployeeRouter.get(
  "/employee",
  EmployeeController.getAllEmployees
);


// Get employee by id
EmployeeRouter.get(
  "/employee/:id",
  EmployeeController.getEmployeeById
);


// Create employee
EmployeeRouter.post(
  "/employee",
  EmployeeController.createEmployee
);


// Update employee
EmployeeRouter.put(
  "/employee/:id",
  EmployeeController.updateEmployee
);


// Delete employee
EmployeeRouter.delete(
  "/employee/:id",
  EmployeeController.deleteEmployee
);


export default EmployeeRouter;