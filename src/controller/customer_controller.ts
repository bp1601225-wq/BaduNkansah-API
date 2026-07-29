import { Request, Response } from "express";
import { CustomerModel } from "../services/customers/customerModel";
import { CustomerServices } from "../services/customers/customer_services";
import ResponseWork from "../utilityResponse/Response";

const model = CustomerModel.customers;

export const CustomerController = {
  async getAllCustomers(_req: Request, res: Response) {
    try {
      const CustomerData = await CustomerServices.getAll(model);

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
};