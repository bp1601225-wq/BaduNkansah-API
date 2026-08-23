import { Request, Response } from "express";
import { DetailedSalesKPI } from "../services/Dashboard/SalesServices/SalesKPIServices";
import ResponseWork from "../utilityResponse/Response";

export const SalesKPIController = {

async GetAllSalesController(req:Request, res:Response){
    
    try {

        const outgoingData = await DetailedSalesKPI.GetAllKPI()

        ResponseWork.SuccessResponse(201,

        "Sales KPI fetched Succesfully",
        outgoingData,
        res,
        )

    } catch (error:any){
ResponseWork.FailureResponse(500,
    error.message,
    res
)
    }
}




}