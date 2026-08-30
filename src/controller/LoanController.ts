import { Request, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { LoansService } from "../services/Loans/LoanService";

export const LoanController = {

  async GetLoans(req: Request, res: Response) {
    try {

      const Loans = await LoansService.GetLoans({});

      ResponseWork.SuccessResponse(
        200,
        "Loans Fetched Successfully",
        Loans,
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


  async GetLoansById(req: Request, res: Response) {
    try {

      const { id } = req.params;

      const Loan = await LoansService.GetLoansById(id as string);

      ResponseWork.SuccessResponse(
        200,
        "Loan Fetched Successfully",
        Loan,
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


  async CreateLoan(req: Request, res: Response) {
    try {

      const incomingdata = req.body;

      console.log(incomingdata);

      const Loan = await LoansService.CreateLoans(incomingdata);

      ResponseWork.SuccessResponse(
        201,
        "Loan Created Successfully",
        Loan,
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


  async UpdateLoan(req: Request, res: Response) {
    try {

      const incomingdata = req.body;

      console.log(incomingdata);

      const Loan = await LoansService.UpdateLoan({
        // id: req.params.id,
        ...incomingdata
      });

      ResponseWork.SuccessResponse(
        200,
        "Loan Updated Successfully",
        Loan,
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

    async MakeLoanPaymentController(req: Request, res: Response) {
    try {

      const incomingdata = req.body;

      console.log(incomingdata);

      const Loan = await LoansService.MakeLoanPayment({
        // id: req.params.id,
        ...incomingdata
      });

      ResponseWork.SuccessResponse(
        200,
        "Loan Updated Successfully",
        Loan,
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


//   async DeleteLoan(req: Request, res: Response) {
//     try {

//       const { id } = req.params;

//       const Loan = await LoansService.DeleteLoan(id as string);

//       ResponseWork.SuccessResponse(
//         200,
//         "Loan Deleted Successfully",
//         Loan,
//         res
//       );

//     } catch (error: any) {

//       console.log(error);

//       ResponseWork.FailureResponse(
//         500,
//         error.message,
//         res
//       );

//     }
//   }

};