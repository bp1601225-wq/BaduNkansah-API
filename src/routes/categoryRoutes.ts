import { Router } from "express";
import CategoryController from "../controller/category_controller";

const CategoryRouter = Router();

// =========================
// Book Categories
// =========================
CategoryRouter.post("/book-categories", CategoryController.book.create);
CategoryRouter.get("/book-categories", CategoryController.book.getAll);
CategoryRouter.get("/book-categories/:id", CategoryController.book.getById);
CategoryRouter.put("/book-categories/:id", CategoryController.book.update);
CategoryRouter.delete("/book-categories/:id", CategoryController.book.delete);

// =========================
// Maintenance Categories
// =========================
CategoryRouter.post(
  "/maintenance-categories",
  CategoryController.maintenance.create
);
CategoryRouter.get(
  "/maintenance-categories",
  CategoryController.maintenance.getAll
);
CategoryRouter.get(
  "/maintenance-categories/:id",
CategoryController.maintenance.getById
);

CategoryRouter.put(
  "/maintenance-categories/:id",
  CategoryController.maintenance.update
);
CategoryRouter.delete(
  "/maintenance-categories/:id",
  CategoryController.maintenance.delete
);

// =========================
// Expense Categories
// =========================
CategoryRouter.post(
  "/expense-categories",
  CategoryController.expense.create
);
CategoryRouter.get(
  "/expense-categories",
  CategoryController.expense.getAll
);
CategoryRouter.get(
  "/expense-categories/:id",
  CategoryController.expense.getById
);
CategoryRouter.put(
  "/expense-categories/:id",
  CategoryController.expense.update
);
CategoryRouter.delete(
  "/expense-categories/:id",
  CategoryController.expense.delete
);

export default CategoryRouter;