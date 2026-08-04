import { Request, response, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { ExpenseServices } from "../services/Expenses/ExpenseService";

export const ExpenseController = {

async GetAll(req:Request, res:Response){
    
    try {

const AllData = await ExpenseServices.getAllExpense()

ResponseWork.SuccessResponse(201,
    "All expense fetched succesfully",
    AllData,
    res
)

    } 
    catch (error:any){
console.log(error)

ResponseWork.FailureResponse(500,
    error.message,
    res
)
    }
},


// Create Expense
async Create(req:Request, res:Response){
    try {

        const incomingData = req.body


console.log(`Expense data is`, incomingData)

const CreatedData = await ExpenseServices.createExpense(incomingData)

ResponseWork.SuccessResponse(201,
    "Expense Created Succesfully",
    CreatedData,
    res
)
    }  catch (error:any){
console.log(error)

ResponseWork.FailureResponse(500,
    error.message,
    res
)
    }
},



// update Expense
async update(req: Request, res: Response) {
  try {
    const incomingData = req.body;
    const id = req.params.id as string;

    const FinalData = {
      ...incomingData,
      id,
    };

    const UpdatedData = await ExpenseServices.UpdateExpense(FinalData);

    ResponseWork.SuccessResponse(
      201,
      "Expense updated successfully",
      UpdatedData,
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
}

}