import { Request, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { GetLoansKPI } from "../services/Dashboard/LoansKPI/LoansKPI";

export const LoankpIController = {
  // Get all loan KPIs
  async GetLoansKPI(req: Request, res: Response) {
    try {
      const KpiData = await GetLoansKPI();

      ResponseWork.SuccessResponse(
        200,
        "Loan KPIs fetched successfully",
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