import { Request, Response, NextFunction } from "express";
import MastersService from "../services/Masters/master_Services";
import ResponseWork from "../utilityResponse/Response";
import { error } from "node:console";

const MasterControllers = {

  // =========================
  // Authors
  // =========================

  async createAuthor(req: Request, res: Response, next: NextFunction) {
    try {

      const incomingData = req.body;

      console.log(incomingData)


      const author = await MastersService.createAuthor(incomingData);


      return ResponseWork.SuccessResponse(
        201,
        "Author created successfully",
        author,
        res
      );

    } catch (error) {
      return ResponseWork.FailureResponse(
        400,
        "Failed to create author",
        res,
        error
      );
    }
  },


  async getAllAuthors(_req: Request, res: Response, next: NextFunction) {
    try {

      const authors = await MastersService.getAllAuthors();

      return ResponseWork.SuccessResponse(
        200,
        "Authors fetched successfully",
        authors,
        res
      );

    } catch (error) {
      return ResponseWork.FailureResponse(
        400,
        "Failed to fetch authors",
        res,
        error
      );
    }
  },


  async getAuthorById(
     req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {

      const { id } = req.params;

      const author = await MastersService.getAuthorById(id);

      return ResponseWork.SuccessResponse(
        200,
        "Author fetched successfully",
        author,
        res
      );

    } catch (error) {
      return ResponseWork.FailureResponse(
        400,
        "Failed to fetch author",
        res,
        error
      );
    }
  },


  async updateAuthor(req: Request, res: Response, next: NextFunction) {
    try {

      const author = await MastersService.updateAuthor(req.body);


      console.log(author)

      return ResponseWork.SuccessResponse(
        200,
        "Author updated successfully",
        author,
        res
      );

    } catch (error) {
      return ResponseWork.FailureResponse(
        400,
        "Failed to update author",
        res,
        error
      );
    }
  },


async deleteAuthor(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {

    const { id } = req.params;

    const author = await MastersService.deleteAuthor(id);

    return ResponseWork.SuccessResponse(
      200,
      "Author deleted successfully",
      author,
      res
    );

  } catch(error) {
    return ResponseWork.FailureResponse(
      400,
      "Failed to delete author",
      res,
      error
    );
  }
},





  // =========================
  // Suppliers
  // =========================
async GetAllSuppliers(req:Request, res:Response, ){

  try {

    const data =await MastersService.GetAllSuppliers()

    ResponseWork.SuccessResponse(
      201,
      "Suppliers fetched Succesfully",
      data,
      res,
    )

  } catch (error){
ResponseWork.FailureResponse(
  500,
  "Something went wrong whilst fetching suppliers",
  res,
  error
)
  }
},


async CreateSupplier(req:Request, res:Response, ){

  try {


    const incomingData = req.body

console.log(incomingData)

    const data =await MastersService.CreatSuppliers(incomingData)

    ResponseWork.SuccessResponse(
      201,
      "Supplier ccreated Succesfully",
      data,
      res,

    )

  } catch (error){

console.log(error)

ResponseWork.FailureResponse(
  500,
  "Something went wrong whilst creating supplier",
  res,
  error
)
  }
},

async UpdateSupplier(req:Request, res:Response){

try {

  const id = req.params.id as string
  const data = req.body

let combinedData = {
  id,
  data
}
console.log(combinedData)

const UpdatedSuppliers = await MastersService.UpdateSuppliers(combinedData)

ResponseWork.SuccessResponse(201,
  "Supplier updated succesfully",
  UpdatedSuppliers,
  res,
)

} catch (error){
  console.log(error)
  ResponseWork.FailureResponse(500,
    "Failed to update Supplier",
    res
  )
}

},

async DeleteSupplier (req:Request, res:Response){
  try {

    const incomingId = req.params.id as string
    await MastersService.DeleteSupplier(incomingId)

    ResponseWork.SuccessResponse(201,
      "Supplier deleted succesfully",
      incomingId,
      res
    )
  } catch (error){
    console.error(error)

    ResponseWork.FailureResponse(500,
      "Something went wrong whilst deleting supplier",
      res,
    )
  }
},


  // =========================
  // Stationeries
  // =========================


  async createStationery(req: Request, res: Response, next: NextFunction) {
    try {

      const stationery = await MastersService.createStationery(req.body);

      return ResponseWork.SuccessResponse(
        201,
        "Stationery created successfully",
        stationery,
        res
      );

    } catch (error) {
      return ResponseWork.FailureResponse(
        400,
        "Failed to create stationery",
        res,
        error
      );
    }
  },


  async getAllStationeries(req: Request, res: Response, next: NextFunction) {
    try {

      const stationeries = await MastersService.getAllStationeries();

      return ResponseWork.SuccessResponse(
        200,
        "Stationeries fetched successfully",
        stationeries,
        res
      );

    } catch (error) {
console.log(error)

      return ResponseWork.FailureResponse(
        400,
        "Failed to fetch stationeries",
        res,
        error
      );
    }
  },


  async getStationeryById(
     req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {

      const { id } = req.params;

      const stationery = await MastersService.getStationeryById(id);

      return ResponseWork.SuccessResponse(
        200,
        "Stationery fetched successfully",
        stationery,
        res
      );

    } catch (error) {
      return ResponseWork.FailureResponse(
        400,
        "Failed to fetch stationery",
        res,
        error
      );
    }
  },


  async updateStationery(req: Request, res: Response, next: NextFunction) {
    try {

const incomingData = req.body

console.log(incomingData)

      const stationery = await MastersService.updateStationery(incomingData);




      return ResponseWork.SuccessResponse(
        200,
        "Stationery updated successfully",
        stationery,
        res
      );

    } catch (error) {

console.log(error)

      return ResponseWork.FailureResponse(
        400,
        "Failed to update stationery",
        res,
        error
      );
    }
  },


  async deleteStationery(
     req: Request<{ id: string }>
     , res: Response, next: NextFunction) {
    try {

      const { id } = req.params;

      const stationery = await MastersService.deleteStationery(id);

      return ResponseWork.SuccessResponse(
        200,
        "Stationery deleted successfully",
        stationery,
        res
      );

    } catch (error) {
      return ResponseWork.FailureResponse(
        400,
        "Failed to delete stationery",
        res,
        error
      );
    }
  },


  // Create stationary Resevations
  async createStationaryReservation(req:Request, res:Response){

    try {

const incomingData = req.body

console.log(`Reservation data is`, incomingData)

const reservedSationary = await MastersService.createStationaryReservation(incomingData)


return ResponseWork.SuccessResponse(201,
  "reservation created succesfully",
  reservedSationary,
  res
  
)
    }
     catch (error:any){
      console.error(error)

      return ResponseWork.FailureResponse(500, 
        error.message,
        res,
      )
    }

  },

  async getStationaryReservations(req:Request, res:Response){
       try {



const AllreservedSationary = await MastersService.getStationaryReservations()


return ResponseWork.SuccessResponse(201,
  "reservation fetched succesfully",
AllreservedSationary,
  res
  
)
    } catch (error){
      console.error(error)

      return ResponseWork.FailureResponse(500, 
        "error getting reserved stationary, something went wrong",
        res,
      )
    }

  },

 async updateStationaryReservation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;


    const responseUpdate =
      await MastersService.updateStationaryReservationStatus({
        id,
        status,
      });

      console.log(responseUpdate)

    ResponseWork.SuccessResponse(
      200,
      "Stationery reservation updated successfully",
      responseUpdate,
      res
    );
  } catch (error: any) {
    console.error(error);

    ResponseWork.FailureResponse(
      500,
      error.message,
      res
    );
  }
}
};

export default MasterControllers;