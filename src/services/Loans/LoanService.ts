import { Loan, LoanPayment } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";




export const LoansService = {

  // =========================
  // GET ALL LOANS
  // =========================
GetLoans(search?:any, status?:any, type?:any) {
  return prisma.loan.findMany({

where: {
    ...(search && {
      OR: [
        {
          personName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),

    ...(status && {
      status: status,
    }),

    ...(type && {
      type: type,
    }),
  },






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
    loanDate,
    dueDate,
    status,
    notes,
  } = data;

  // =========================
  // Required fields
  // =========================


  const loanAmount = Number(amount);

  if (!Number.isFinite(loanAmount)) {
    throw new Error("Loan amount must be a valid number");
  }

  if (loanAmount <= 0) {
    throw new Error("Loan amount must be greater than 0");
  }

  // =========================
  // Loan date validation
  // =========================

  const finalLoanDate = loanDate
    ? new Date(loanDate)
    : new Date();

  if (Number.isNaN(finalLoanDate.getTime())) {
    throw new Error("Invalid loan date");
  }

  // Loan date cannot be in the future
  const today = new Date();

  today.setHours(23, 59, 59, 999);

  if (finalLoanDate > today) {
    throw new Error("Loan date cannot be in the future");
  }

  // =========================
  // Due date validation
  // =========================

  let finalDueDate: Date | null = null;

  if (dueDate) {
    finalDueDate = new Date(dueDate);

    if (Number.isNaN(finalDueDate.getTime())) {
      throw new Error("Invalid due date");
    }

    // Due date must be after loan date
    if (finalDueDate <= finalLoanDate) {
      throw new Error("Due date must be after loan date");
    }
  }

  // =========================
  // Create loan
  // =========================

  return prisma.loan.create({
    data: {
      type: type,
      personName: personName.trim(),
      phone: phone,
      amount: loanAmount,

      loanDate: finalLoanDate,
 
      dueDate: finalDueDate,

      status: status,

      notes: notes?.trim() || null,
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

  const updatedLoan = await prisma.$transaction(async (tx) => {
    // =========================
    // Find existing loan
    // =========================

    const loan = await tx.loan.findUnique({
      where: {
        id,
      },
    });

    // Prevent updating ghost/non-existing loans
    if (!loan) {
      throw new Error(
        "The loan you are trying to update does not exist"
      );
    }

    // =========================
    // Get all payments for this loan
    // =========================

    const payments = await tx.loanPayment.findMany({
      where: {
        loanId: loan.id,
      },
    });

    // =========================
    // Calculate total amount already paid
    // =========================

    const totalPaid = payments.reduce(
      (total, payment) => total + Number(payment.amount),
      0
    );

    // =========================
    // Validate new loan amount
    // =========================

    const incomingAmount = Number(amount);

    if (Number.isNaN(incomingAmount) || incomingAmount <= 0) {
      throw new Error("Loan amount must be greater than 0");
    }

    // New loan amount cannot be less than
    // the amount already paid
    if (incomingAmount < totalPaid) {
      throw new Error(
        `Cannot reduce loan amount below the amount already paid (${totalPaid}).`
      );
    }

    // =========================
    // Loan date validation
    // =========================

    const finalLoanDate = loanDate
      ? new Date(loanDate)
      : loan.loanDate;

    if (Number.isNaN(finalLoanDate.getTime())) {
      throw new Error("Invalid loan date");
    }

    // Loan date cannot be in the future
    const today = new Date();

    today.setHours(23, 59, 59, 999);

    if (finalLoanDate > today) {
      throw new Error("Loan date cannot be in the future");
    }

    // =========================
    // Due date validation
    // =========================

    let finalDueDate: Date | null = loan.dueDate;

    if (dueDate) {
      finalDueDate = new Date(dueDate);

      if (Number.isNaN(finalDueDate.getTime())) {
        throw new Error("Invalid due date");
      }

      // Due date must be after loan date
      if (finalDueDate <= finalLoanDate) {
        throw new Error("Due date must be after loan date");
      }
    }

    // =========================
    // Update loan
    // =========================

    const updatedLoan = await tx.loan.update({
      where: {
        id,
      },

      data: {
        type,
        personName,
        phone,
        amount: incomingAmount,
        loanDate: finalLoanDate,
        dueDate: finalDueDate,
        status,
        notes,
      },
    });

    return updatedLoan;
  });

  return updatedLoan;
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
},


DeleteLoans(id:string){
  return prisma.loan.delete({
    where:{
      id
    }
  })
}



};