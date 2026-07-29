import { Request, Response } from "express";
import { InventoryModel } from "../services/inventory/inventoryModel";

import ResponseWork from "../utilityResponse/Response";
import { InventoryServices } from "../services/inventory/Inventory_services";
import { BooksServices } from "../services/BookCatalogs/BookServices";
const model = InventoryModel.Inventory;


export const InventoryController = {


  async getAllInventory(_req: Request, res: Response) {

    try {

      const InventoryData = await InventoryServices.getAllInventory(
        model
      );


      ResponseWork.SuccessResponse(
        200,
        "Inventory Fetched Successfully",
        InventoryData,
        res
      );


    } catch(error) {

      console.log(error);


      ResponseWork.FailureResponse(
        500,
        "There was an error fetching inventory",
        res
      );

    }

  },





  async CreateInventory(req: Request, res: Response) {

    try {

      const incomingData = req.body;


      const InventoryData = await InventoryServices.create(
        model,
        incomingData
      );


      ResponseWork.SuccessResponse(
        201,
        "Inventory Added Successfully",
        InventoryData,
        res
      );


    } catch(error) {

      console.log(error);


      ResponseWork.FailureResponse(
        500,
        "There was an error adding inventory",
        res
      );

    }

  },







  async UpdateInventory(req: Request, res: Response) {

    try {

      const incomingData = req.body;


      const InventoryData = await InventoryServices.update(
        model,
        incomingData
      );


      ResponseWork.SuccessResponse(
        200,
        "Inventory Updated Successfully",
        InventoryData,
        res
      );


    } catch(error) {

      console.log(error);


      ResponseWork.FailureResponse(
        500,
        "There was an error updating inventory",
        res
      );

    }

  },









};