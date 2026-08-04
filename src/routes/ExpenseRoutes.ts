import { Router } from "express";
import { ExpenseController } from "../controller/expenseController";

const ExpenseRoutes = Router();

// Get all expenses
ExpenseRoutes.get("/expenses", ExpenseController.GetAll);

// Create expense
ExpenseRoutes.post("/expenses", ExpenseController.Create);

// Update expense
ExpenseRoutes.put("/expenses/:id", ExpenseController.update);



export default ExpenseRoutes;