import { Request, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { SalesServiceModel } from "../services/Sales/SaleService";

export const SalesController = {


    async GetAllSalesRecords(req:Request ,res:Response) {

    try {

        const AllSalesData = await SalesServiceModel.GetAllSales()

ResponseWork.SuccessResponse(201,
"Sales fetched successfully",
AllSalesData,
res
)

    } catch (error:any){
        console.log(error)

        ResponseWork.FailureResponse(500,
            error.message,
            res
        )
    }
    },
 
   async  createSales(req:Request, res:Response){

        try {
            const incomingData = req.body
const createSalesData = await SalesServiceModel.CreateSales(incomingData)

ResponseWork.SuccessResponse(201, 
    "Sales succesfully recorded",
    createSalesData,
    res
)
        } catch (error:any){
            console.log(error)
ResponseWork.FailureResponse(500,
    error.message,
    res
)
        }
    }

}