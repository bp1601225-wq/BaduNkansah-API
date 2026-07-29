import { Request, Response, NextFunction } from "express";
import MastersService from "../services/master_Services";
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











  // =========================
  // Categories

  // =========================


  // async createCategory(req: Request, res: Response, next: NextFunction) {
  //   try {

  //     const category = await MastersService.createCategory(req.body);

  //     return ResponseWork.SuccessResponse(
  //       201,
  //       "Category created successfully",
  //       category,
  //       res
  //     );

  //   } catch (error) {
  //     return ResponseWork.FailureResponse(
  //       400,
  //       "Failed to create category",
  //       res,
  //       error
  //     );
  //   }
  // },


  // async getAllCategories(req: Request, res: Response, next: NextFunction) {
  //   try {

  //     const categories = await MastersService.getAllCategories();

  //     return ResponseWork.SuccessResponse(
  //       200,
  //       "Categories fetched successfully",
  //       categories,
  //       res
  //     );

  //   } catch (error) {
  //     return ResponseWork.FailureResponse(
  //       400,
  //       "Failed to fetch categories",
  //       res,
  //       error
  //     );
  //   }
  // },


  // async getCategoryById(
  //    req: Request<{ id: string }>
  //   , res: Response, next: NextFunction) {
  //   try {

  //     const { id } = req.params;

  //     const category = await MastersService.getCategoryById(id);

  //     return ResponseWork.SuccessResponse(
  //       200,
  //       "Category fetched successfully",
  //       category,
  //       res
  //     );

  //   } catch (error) {
  //     return ResponseWork.FailureResponse(
  //       400,
  //       "Failed to fetch category",
  //       res,
  //       error
  //     );
  //   }
  // },


  // async updateCategory(req: Request, res: Response, next: NextFunction) {
  //   try {

  //     const category = await MastersService.updateCategory(req.body);

  //     return ResponseWork.SuccessResponse(
  //       200,
  //       "Category updated successfully",
  //       category,
  //       res
  //     );

  //   } catch (error) {
  //     return ResponseWork.FailureResponse(
  //       400,
  //       "Failed to update category",
  //       res,
  //       error
  //     );
  //   }
  // },


  // async deleteCategory(
  //    req: Request<{ id: string }>, res: Response, next: NextFunction) {
  //   try {

  //     const { id } = req.params;

  //     const category = await MastersService.deleteCategory(id);

  //     return ResponseWork.SuccessResponse(
  //       200,
  //       "Category deleted successfully",
  //       category,
  //       res
  //     );

  //   } catch (error) {
  //     return ResponseWork.FailureResponse(
  //       400,
  //       "Failed to delete category",
  //       res,
  //       error
  //     );
  //   }
  // },


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

      const stationery = await MastersService.updateStationery(req.body);

      return ResponseWork.SuccessResponse(
        200,
        "Stationery updated successfully",
        stationery,
        res
      );

    } catch (error) {
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

};

export default MasterControllers;