import e, { Request, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { PurchaseModel } from "../services/Purchase/PurchaseService";

export const PurchaseController = {

  // Get All Purchases
  async GetAll(req: Request, res: Response) {
    try {
      const status = req.query.status as string | undefined

      const AllData = await PurchaseModel.GetAllPurchase(status);


      
      ResponseWork.SuccessResponse(
        200,
        "All purchases fetched successfully",
        AllData,
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


  // Get Purchase By Id
  async GetById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const Data = await PurchaseModel.GetPurchaseById(id as string);

      ResponseWork.SuccessResponse(
        200,
        "Purchase fetched successfully",
        Data,
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


  // Create Purchase
  async Create(req: Request, res: Response) {
    try {

      const incomingData = req.body;

      const CreatedData = await PurchaseModel.CreatePurchase(incomingData);

      ResponseWork.SuccessResponse(
        201,
        "Purchase created successfully",
        CreatedData,
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



  // Update Purchase
  async Update(req: Request, res: Response) {
    try {

      const incomingData = req.body;

      const id = req.params.id as string;


      const FinalData = {
        ...incomingData,
        id,
      };


      const UpdatedData = await PurchaseModel.updatePurchase(FinalData);


      ResponseWork.SuccessResponse(
        200,
        "Purchase updated successfully",
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
  },

  // Purchased Item

  async GetPurchasedItem(req:Request, res:Response){
try {

const AllPurchasedItem = await PurchaseModel.GetAllPurchase()

ResponseWork.SuccessResponse(201,
  "Purchased Fetched succesfully",
  AllPurchasedItem,
  res
)

} 

  catch (error: any) {

      console.log(error);


      ResponseWork.FailureResponse(
        500,
        error.message,
        res
      );

    }
  },



  // Create Purchase Item
  async CreatePurchasedItem(req: Request, res: Response) {

    try {

      const incomingData = req.body;


      const CreatedItem = await PurchaseModel.createPurchaseItem(incomingData)

      ResponseWork.SuccessResponse(
        201,
        "Purchase item created successfully",
        CreatedItem,
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