import { Router } from "express";
import { LoanController } from "../controller/LoanController";


export const LoansRouter = Router();





LoansRouter.get(
  "/loans",
  LoanController.GetLoans
);

LoansRouter.get(
  "/loans/:id",
  LoanController.GetLoansById
);

LoansRouter.post(
  "/loans",
  LoanController.CreateLoan
);

// Loans
LoansRouter.post(
  "/loans-payments",
  LoanController.MakeLoanPaymentController
);

LoansRouter.put(
  "/loans",
  LoanController.UpdateLoan
);



// LoansRouter.patch(
//   "/loans/:id",
//   LoanController.UpdateLoan
// );


// LoansRouter.delete(
//   "/loans/:id",
//   LoanController.DeleteLoan
// );

