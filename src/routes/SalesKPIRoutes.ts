
import { Router } from "express";
import { SalesKPIController } from "../controller/SalesKPIController";

export const SalesKPIRoutes = Router()

SalesKPIRoutes.get("/sales-kpi", SalesKPIController.GetAllSalesController)