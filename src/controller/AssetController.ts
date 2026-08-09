import { Request, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { AssetServices } from "../services/Assets/AssetServices";


export const AssetController = {


async GetAllAssets(req: Request, res: Response) {
  try {

    const AllAssets = await AssetServices.GetAllAssets();

    ResponseWork.SuccessResponse(
      200,
      "Assets Fetched Successfully",
      AllAssets,
      res
    );

  } catch(error:any) {

    console.log(error);

    ResponseWork.FailureResponse(
      500,
      error.message,
      res
    );

  }
},



async GetAssetById(req: Request, res: Response) {
  try {

    const { id } = req.params;

    const Asset = await AssetServices.GetAssetById(id as string);


    ResponseWork.SuccessResponse(
      200,
      "Asset Fetched Successfully",
      Asset,
      res
    );


  } catch(error:any) {

    console.log(error);

    ResponseWork.FailureResponse(
      500,
      error.message,
      res
    );

  }
},




async CreateAsset(req: Request, res: Response) {
  try {


    const incomingdata = req.body

console.log(incomingdata)

    const Asset = await AssetServices.CreateAssets(incomingdata);


    ResponseWork.SuccessResponse(
      201,
      "Asset Created Successfully",
      Asset,
      res
    );


  } catch(error:any) {

    console.log(error);

    ResponseWork.FailureResponse(
      500,
      error.message,
      res
    );

  }
},


async UpdateAsset(req: Request, res: Response) {
  try {


const incomingdata = req.body

console.log(incomingdata)

    const Asset = await AssetServices.updateAssets({
      id: req.params.id,
      ... incomingdata
    });


    ResponseWork.SuccessResponse(
      200,
      "Asset Updated Successfully",
      Asset,
      res
    );


  } catch(error:any) {

    console.log(error);

    ResponseWork.FailureResponse(
      500,
      error.message,
      res
    );

  }
},




async DeleteAsset(req: Request, res: Response) {
  try {

    const { id } = req.params;


    const Asset = await AssetServices.deleteAsset(id as string);


    ResponseWork.SuccessResponse(
      200,
      "Asset Deleted Successfully",
      Asset,
      res
    );


  } catch(error:any) {

    console.log(error);

    ResponseWork.FailureResponse(
      500,
      error.message,
      res
    );

  }
}



};