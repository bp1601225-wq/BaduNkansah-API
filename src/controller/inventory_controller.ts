import { Request, Response } from "express";
import { InventoryModel } from "../services/inventory/inventoryModel";

import ResponseWork from "../utilityResponse/Response";
import { InventoryServices } from "../services/inventory/Inventory_services";
import { StockStatus } from "../../generated/prisma/enums";



const model = InventoryModel.Inventory;



export const InventoryController = {


  async getAllInventory(req: Request, res: Response) {

    try {


const search = req.query.search as string
const status = req.query.status as StockStatus


      const InventoryData = await InventoryServices.getAllInventory(
        model,
        search,
        status
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


    } catch(error:any) {

      console.log(error);


      ResponseWork.FailureResponse(
        500,
error.mesage,
       res
      );

    }

  },









};