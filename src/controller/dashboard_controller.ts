import { Request, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { DashboardKPIService } from "../services/Dashboard/DashboardKPIService";

export const DashboardController = {

  // Get all dashboard KPIs
  async GetDashboardKPI(req: Request, res: Response) {
    try {
      const KpiData = await DashboardKPIService.GetDashboardKPI();

      ResponseWork.SuccessResponse(
        200,
        "Dashboard KPIs fetched successfully",
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
