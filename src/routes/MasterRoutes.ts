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

MasterRouter.put("/authors/:id", MasterControllers.updateAuthor )

MasterRouter.patch(
  "/authors/:id",
  MasterControllers.updateAuthor
);

MasterRouter.delete(
  "/authors/:id",
  MasterControllers.deleteAuthor
);


// =========================
// Suppliers Routes
// =========================

MasterRouter.get("/suppliers", MasterControllers.GetAllSuppliers)


MasterRouter.post("/suppliers", MasterControllers.CreateSupplier)

MasterRouter.put("/suppliers/:id", MasterControllers.UpdateSupplier)

MasterRouter.delete("/suppliers/:id", MasterControllers.DeleteSupplier)


// Stationaries
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


MasterRouter.put(
  "/stationeries/:id",
  MasterControllers.updateStationery
);

MasterRouter.delete(
  "/stationeries/:id",
  MasterControllers.deleteStationery
);

// Staionary reservations

MasterRouter.post("/stationery-reservations", MasterControllers.createStationaryReservation)


MasterRouter.get("/stationery-reservations", MasterControllers.getStationaryReservations)

MasterRouter.patch(
  "/stationery-reservations-status/:id",
  MasterControllers.updateStationaryReservation
);


export default MasterRouter;