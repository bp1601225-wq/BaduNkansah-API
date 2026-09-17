import { Request, Response } from "express";
import GetBooksKPIServices from "../services/Dashboard/DashboardKPI/BooksKPI";
import ResponseWork from "../utilityResponse/Response";

async function GetBooksKPIController(req:Request, res:Response){

    try {

const outGoingData = await GetBooksKPIServices()

ResponseWork.SuccessResponse(201,
    "Books Data fetched succesfully",
    outGoingData,
    res
)


    } catch (error:any){

ResponseWork.FailureResponse(500,
    error.message,
    res
)

    }

}


export default GetBooksKPIController