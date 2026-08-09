import { Router } from "express";
import { DashboardController } from "../../controller/dashboard_controller";

export const DashboardRouter = Router();

// Get all dashboard KPIs
DashboardRouter.get(
  "/dashboard/kpis",
  DashboardController.GetDashboardKPI
);