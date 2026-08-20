import { Router } from "express";
import { SalesController } from "../controller/SalesController";

export const SalesRoutes = Router()

//  All sales Route

SalesRoutes.get("/sales", SalesController.GetAllSalesRecords)
SalesRoutes.post('/sales', SalesController.createSales)