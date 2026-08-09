import { Router } from "express";
import { AssetKPIController } from "../../controller/AssetKPIController";

export const AssetKpiRoutes = Router()

AssetKpiRoutes.get("/assets-kpi", AssetKPIController.GetAllAssetsKPI)