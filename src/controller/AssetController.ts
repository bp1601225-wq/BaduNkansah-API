import { Request, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { AssetServices } from "../services/Assets/AssetServices";
import { AssetCategory, AssetStatus, Location } from "../../generated/prisma/enums";


export const AssetController = {


async GetAllAssets(req: Request, res: Response) {
  try {
const search = (req.query.search as string)?.trim();

const location = (req.query.location as string)?.trim() as Location;

const status = (req.query.status as string)?.trim() as AssetStatus;

const category = (req.query.category as string)?.trim() as AssetCategory;

    const AllAssets = await AssetServices.GetAllAssets(
      search,
      location,
      status,
      category
    );

    ResponseWork.SuccessResponse(
      200,
      "Assets Fetched Successfully",
      AllAssets,
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