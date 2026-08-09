import { Router } from "express";
import { AssetController } from "../controller/AssetController";

export const AssetRoutes = Router()

AssetRoutes.get("/assets", AssetController.GetAllAssets)
AssetRoutes.get("/assets/:id", AssetController.GetAssetById)
AssetRoutes.put("/assets/:id", AssetController.UpdateAsset)

AssetRoutes.post("/assets", AssetController.CreateAsset)
AssetRoutes.delete("/assets/:id", AssetController.DeleteAsset)

