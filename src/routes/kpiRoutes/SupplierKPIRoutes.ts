import { Router } from "express";

import { SuppliersKPIController } from "../../controller/SupplierKPI";


export const SuppliersKpiRoutes = Router();

SuppliersKpiRoutes.get(
  "/suppliers-kpi",
  SuppliersKPIController.GetSuppliersKPI
);