import { prisma } from "../../../lib/prisma";

export async function GetLoansKPI() {
  const [
    recordedTransactions,
    totalLoanAmount,
    totalAmountPaid,
    totalLoanPayments,
    activeLoans,
    completedLoans,
    overdueLoans,
    cancelledLoans,
    averageLoanAmount,
    DueSoon,



    // Max and Min loans 
    highestAmount,
    LowestAmount




  ] = await Promise.all([
    // Total number of loans recorded
    prisma.loan.count(),

    // Total amount lent
    prisma.loan.aggregate({
      _sum: {
        amount: true,
      },
    }),

    // Total amount paid across all loans
    prisma.loan.aggregate({
      _sum: {
        amountPaid: true,
      },
    }),

    // Total number of payment transactions
    prisma.loanPayment.count(),

    // Active loans
    prisma.loan.count({
      where: {
        status: "ACTIVE",
      },
    }),

    // Completed loans
    prisma.loan.count({
      where: {
        status: "COMPLETED",
      },
    }),

    // Overdue loans
    prisma.loan.count({
      where: {
        status: "OVERDUE",
      },
    }),

    // Cancelled loans
    prisma.loan.count({
      where: {
        status: "CANCELLED",
      },
    }),

    // Average loan amount
    prisma.loan.aggregate({
      _avg: {
        amount: true,
      },
    }),

    // Due Soon / Overdue loans
    prisma.loan.groupBy({
      by: ["type", "personName", "dueDate"],

      where: {
        status: "OVERDUE",
      },

      _count: {
        _all: true,
      },

      _sum: {
        amount: true,
        amountPaid: true,
      },
    }),

    // Highest Amount
    prisma.loan.aggregate({
      _max:{
        amount:true
      }
    }),
 
    // lowestAmount

    prisma.loan.aggregate({
      _min:{
        amount:true
      }, 
      
    })




  ]);

  // -----------------------------
  // TOTAL LOAN AMOUNT
  // -----------------------------

  const totalAmount = Number(
    totalLoanAmount._sum.amount || 0
  );

  // -----------------------------
  // TOTAL AMOUNT PAID
  // -----------------------------

  const amountPaid = Number(
    totalAmountPaid._sum.amountPaid || 0
  );

  // -----------------------------
  // OUTSTANDING BALANCE
  // -----------------------------

  const outstandingBalance = totalAmount - amountPaid;

  // -----------------------------
  // COLLECTION RATE
  // -----------------------------

  const collectionRate =
    totalAmount > 0
      ? (amountPaid / totalAmount) * 100
      : 0;




      
  // -----------------------------
  // DUE SOON / OVERDUE DETAILS
  // -----------------------------

  const dueSoon = DueSoon.map((loan) => {
    const amount = Number(loan._sum.amount || 0);

    const amountPaid = Number(
      loan._sum.amountPaid || 0
    );

    const balance = amount - amountPaid;

    return {
      type: loan.type,
      personName: loan.personName,
      dueDate: loan.dueDate,

      count: loan._count._all,

      amount,
      amountPaid,

      balance,
    };
  });

  // -----------------------------
  // TOTAL DUE SOON BALANCE
  // -----------------------------

  const dueSoonBalance = dueSoon.reduce(
    (total, loan) => total + loan.balance,
    0
  );

  // -----------------------------
  // TOTAL DUE SOON AMOUNT
  // -----------------------------

  const dueSoonAmount = dueSoon.reduce(
    (total, loan) => total + loan.amount,
    0
  );

  // -----------------------------
  // TOTAL DUE SOON PAID
  // -----------------------------

  const dueSoonPaid = dueSoon.reduce(
    (total, loan) => total + loan.amountPaid,
    0
  );

  return {
    recordedTransactions,

    totalLoanAmount: totalAmount,

    totalAmountPaid: amountPaid,

    outstandingBalance,

    totalLoanPayments,

    activeLoans,

    completedLoans,

    overdueLoans,

    cancelledLoans,

    averageLoanAmount: Number(
      averageLoanAmount._avg.amount || 0
    ),

  collectionRate: Math.min(
  Number(collectionRate.toFixed(2)),
  100
),

    // Due/overdue KPIs
    dueSoonAmount,

    dueSoonPaid,

    dueSoonBalance,

    dueSoon,




      highestAmount:highestAmount._max.amount,
    LowestAmount:LowestAmount._min.amount


  };
}