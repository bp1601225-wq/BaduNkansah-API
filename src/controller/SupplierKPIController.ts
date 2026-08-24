import { Request, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { SuppliersKPIServices } from "../services/Dashboard/SuppliersKPI/SuppliersKPI";

export const SuppliersKPIController = {

  // Get all supplier KPIs
  async GetSuppliersKPI(req: Request, res: Response) {
    try {
      const KpiData = await SuppliersKPIServices.GetAllSuppliersKPI();

      ResponseWork.SuccessResponse(
        200,
        "Supplier KPIs fetched successfully",
        KpiData,
        res
      );
    } catch (error: any) {
      console.log(error);

      ResponseWork.FailureResponse(
        500,
        error.message,
        res
      );
    }
  },
};