import { Router } from "express";
import { LoankpIController } from "../../controller/LoansKPIController";

export const loansKPIRoutes = Router();

// Get all dashboard KPIs
loansKPIRoutes.get(
  "/loans-kpis",
LoankpIController.GetLoansKPI
);