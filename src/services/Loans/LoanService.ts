import { Loan, LoanPayment } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const LoansService = {

  // =========================
  // GET ALL LOANS
  // =========================
GetLoans(params: {}) {
  return prisma.loan.findMany({
    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      type: true,
      personName: true,
      phone: true,

      // Loan amounts
      amount: true,
      amountPaid: true,

      // Dates
      loanDate: true,
      dueDate: true,

      // Status
      status: true,
      notes: true,

      // Payment count
      _count: {
        select: {
          payments: true,
        },
      },

      // Payment history
      payments: {
        orderBy: {
          paymentDate: "desc",
        },

        select: {
          id: true,
          amount: true,
          paymentDate: true,
          notes: true,
          createdAt: true,
        },
      },

      createdAt: true,
      updatedAt: true,
    },
  });
},


  // =========================
  // CREATE LOAN
  // =========================
  CreateLoans(data: Loan) {

    const {
      type,
      personName,
      phone,
      amount,
      amountPaid,
      loanDate,
      dueDate,
      status,
      notes,
    } = data;

    return prisma.loan.create({
      data: {
        type,
        personName,
        phone,
        amount,

        amountPaid: amountPaid ?? 0,

        loanDate: loanDate
          ? new Date(loanDate)
          : new Date(),

        dueDate: dueDate
          ? new Date(dueDate)
          : null,

        status,
        notes,
      },
    });
  },


  // =========================
  // GET LOAN BY ID
  // =========================
  GetLoansById(id: string) {

    return prisma.loan.findUnique({
      where: {
        id,
      },

      include: {
        payments: {
          orderBy: {
            paymentDate: "desc",
          },
        },

        _count: {
          select: {
            payments: true,
          },
        },
      },
    });
  },


  // =========================
  // UPDATE LOAN
  // =========================
  async UpdateLoan(data: Loan) {

    const {
      id,
      type,
      personName,
      phone,
      amount,
      loanDate,
      dueDate,
      status,
      notes,
    } = data;


    return prisma.loan.update({
      where: {
        id,
      },

      data: {
        type,
        personName,
        phone,
        amount,

        loanDate: loanDate
          ? new Date(loanDate)
          : new Date(),

        dueDate: dueDate
          ? new Date(dueDate)
          : null,

        status,
        notes,
      },
    });
  },


  // =========================
  // MAKE LOAN PAYMENT
  // =========================
MakeLoanPayment(data: any) {
  return prisma.$transaction(async (tx) => {
    // Find the loan
    const loanData = await tx.loan.findUnique({
      where: {
        id: data.loanId,
      },
    });

    // Prevent payment on a non-existent loan
    if (!loanData) {
      throw new Error(
        "The loan you are trying to make payment on does not exist"
      );
    }

    // Current loan values
    const loanAmount = Number(loanData.amount);
    const currentAmountPaid = Number(loanData.amountPaid);

    // Current balance
    const currentBalance = loanAmount - currentAmountPaid;

    // Payment amount
    const paymentAmount = Number(data.amount);

    // Validate payment amount
    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      throw new Error("Payment amount must be greater than zero");
    }

    // Prevent overpayment
    if (paymentAmount > currentBalance) {
      throw new Error(
        `Payment cannot exceed the remaining loan balance of ${currentBalance}`
      );
    }

    // Calculate new values
    const newAmountPaid = currentAmountPaid + paymentAmount;
    const newBalance = loanAmount - newAmountPaid;

    // Create payment record
    const loanPayment = await tx.loanPayment.create({
      data: {
        loanId: loanData.id,
        amount: paymentAmount,
        paymentDate: data.paymentDate ?? new Date(),
        notes: data.notes,
      },
    });

    // Update loan
    await tx.loan.update({
      where: {
        id: loanData.id,
      },
      data: {
        amountPaid: newAmountPaid,
        status: newBalance === 0 ? "COMPLETED" : "ACTIVE",
      },
    });

    return {
      message: "Loan payment made successfully",
      payment: loanPayment,
      amountPaid: newAmountPaid,
      balance: newBalance,
      status: newBalance === 0 ? "PAID" : "ACTIVE",
    };
  });
}



};