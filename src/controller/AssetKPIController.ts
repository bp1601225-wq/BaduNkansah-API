import { Request, Response } from "express";
import { AssetKPIService } from "../services/AssetOverViewKPI/AssetKPIService";
import ResponseWork from "../utilityResponse/Response";

export const AssetKPIController = {
    
    async GetAllAssetsKPI(req:Request, res:Response){
        try {

            const outgoingData = await AssetKPIService.GetAssetKPIs()

            ResponseWork.SuccessResponse(201,
                "Assets Overview fetched succesfully",
                outgoingData,
                res,

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