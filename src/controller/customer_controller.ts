import { Request, Response } from "express";
import { CustomerModel } from "../services/customers/customerModel";
import { CustomerServices } from "../services/customers/customer_services";
import ResponseWork from "../utilityResponse/Response";


const model = CustomerModel.customers;

export const CustomerController = {
  async getAllCustomers(req: Request, res: Response) {
    try {

    const search =
  typeof req.query.search === "string"
    ? req.query.search.trim()
    : "";


      const CustomerData = await CustomerServices.getAll(model, search);



      ResponseWork.SuccessResponse(
        200,
        "Customers Fetched Successfully",
        CustomerData,
        res
      );
    } catch (error) {
      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "There was an error fetching customers",
        res
      );
    }
  },

  async CreateCustomer(req: Request, res: Response) {
    try {
      const incomingData = req.body;

      const CustomerData = await CustomerServices.create(
        model,
        incomingData
      );

      console.log("Customer Data:", incomingData);

      ResponseWork.SuccessResponse(
        201,
        "Customer Added Successfully",
        CustomerData,
        res
      );
    } catch (error) {
      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "There was an error adding the customer",
        res
      );
    }
  },

  async UpdateCustomer(req: Request, res: Response) {
    try {
      const incomingData = req.body;

      const CustomerData = await CustomerServices.update(
        model,
        incomingData
      );

      ResponseWork.SuccessResponse(
        200,
        "Customer Updated Successfully",
        CustomerData,
        res
      );
    } catch (error) {
      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "There was an error updating the customer",
        res
      );
    }
  },

  async DeleteCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params ;

      const CustomerData = await CustomerServices.delete(model, id as string);

      ResponseWork.SuccessResponse(
        200,
        "Customer Deleted Successfully",
        CustomerData,
        res
      );
    } catch (error) {
      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "There was an error deleting the customer",
        res
      );
    }
  },

  async GetCustomerById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const CustomerData = await CustomerServices.getById(model, id as string);

      ResponseWork.SuccessResponse(
        200,
        "Customer Fetched Successfully",
        CustomerData,
        res
      );
    } catch (error) {
      console.log(error);

      ResponseWork.FailureResponse(
        500,
        "There was an error fetching the customer",
        res
      );
    }
  },


  async FetchCustomerWithSales(req: Request, res: Response) {
  try {

    const fetch_Customer_With_SalesData = req.query.search as string;

    const ReturnedSearch = await CustomerServices.GetCustomerSales(
      model,
      fetch_Customer_With_SalesData
    );

    ResponseWork.SuccessResponse(
      200,
      "Data loaded successfully",
      ReturnedSearch,
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
};