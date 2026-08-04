import { Request, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { PurchaseModel } from "../services/Purchase/PurchaseService";

export const PurchaseController = {

  // Get All Purchases
  async GetAll(req: Request, res: Response) {
    try {
      const AllData = await PurchaseModel.GetAllPurchase();

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
};
