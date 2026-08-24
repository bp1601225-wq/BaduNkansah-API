import { Router } from "express";

import { SuppliersKPIController } from "../../controller/SupplierKPIController";


export const SuppliersKpiRoutes = Router();

SuppliersKpiRoutes.get(
  "/suppliers-kpi",
  SuppliersKPIController.GetSuppliersKPI
);