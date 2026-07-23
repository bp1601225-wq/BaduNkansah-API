import { Router } from "express";
import MasterControllers from "../controller/master_Controller";

const MasterRouter = Router();


// =========================
// Authors Routes
// =========================

MasterRouter.post(
  "/authors",
  MasterControllers.createAuthor
);

MasterRouter.get(
  "/authors",
  MasterControllers.getAllAuthors
);

MasterRouter.get(
  "/authors/:id",
  MasterControllers.getAuthorById
);

MasterRouter.patch(
  "/authors/:id",
  MasterControllers.updateAuthor
);

MasterRouter.delete(
  "/authors/:id",
  MasterControllers.deleteAuthor
);


// =========================
// Categories Routes
// =========================

MasterRouter.post(
  "/categories",
  MasterControllers.createCategory
);

MasterRouter.get(
  "/categories",
  MasterControllers.getAllCategories
);

MasterRouter.get(
  "/categories/:id",
  MasterControllers.getCategoryById
);

MasterRouter.patch(
  "/categories/:id",
  MasterControllers.updateCategory
);

MasterRouter.delete(
  "/categories/:id",
  MasterControllers.deleteCategory
);


// =========================
// Stationery Routes
// =========================

MasterRouter.post(
  "/stationeries",
  MasterControllers.createStationery
);

MasterRouter.get(
  "/stationeries",
  MasterControllers.getAllStationeries
);

MasterRouter.get(
  "/stationeries/:id",
  MasterControllers.getStationeryById
);

MasterRouter.patch(
  "/stationeries/:id",
  MasterControllers.updateStationery
);

MasterRouter.delete(
  "/stationeries/:id",
  MasterControllers.deleteStationery
);


export default MasterRouter;