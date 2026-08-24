import { prisma } from "../../../lib/prisma";

export const DashboardKPIService = {

  async GetDashboardKPI() {

    const [

      // Books
      totalBooks,
      booksInStock,
      booksInLowStock,
      booksOutOfStock,
      AvgBookSellingPrice,
      HighestSellingPrice,
      LowestSellingPrice,
      TotalBookReservations,
      TotalReservedBooksQuantity,

      // Books and Reservations
      BookReservations,

      // Customers
      AllCustomers,



      // Employees
      totalEmployees,

      // Stationery
      totalStationery,

      // Inventory
      totalInventoryUnits,
      lowStockItems,
      InStockItems,
      OutOfStockItems,

      // Authors
      totalAuthors,

      // Expenses
      totalExpenses,
      ExpenseGroupedByCategory,
      expenseCategories,

      // Returns
      totalReturns,

      // Reservations
      activeReservations,

      // Users
      totalUsers

    ] = await Promise.all([

      // =====================
      // BOOKS
      // =====================

      prisma.bookCatalog.count(),

      prisma.inventory.count({
        where: {
          bookId: {
            not: null,
          },
          status: "IN_STOCK",
        },
      }),

      prisma.inventory.count({
        where: {
          bookId: {
            not: null,
          },
          status: "LOW_STOCK",
        },
      }),

      prisma.inventory.count({
        where: {
          bookId: {
            not: null,
          },
          status: "OUT_OF_STOCK",
        },
      }),

      prisma.bookCatalog.aggregate({
        _avg: {
          sellingPrice: true,
        },
      }),

      prisma.bookCatalog.aggregate({
        _max: {
          sellingPrice: true,
        },
      }),

      prisma.bookCatalog.aggregate({
        _min: {
          sellingPrice: true,
        },
      }),

      prisma.bookReservation.count(),

      prisma.bookReservation.aggregate({
        _sum: {
          quantity: true,
        },
      }),

      // =====================
      // BOOK RESERVATIONS
      // =====================

      prisma.bookReservation.count(),

      // =====================
      // CUSTOMERS
      // =====================

      prisma.customer.count(),

      // =====================
      // SUPPLIERS
      // =====================


    

      // =====================
      // EMPLOYEES
      // =====================

      prisma.employee.count(),

      // =====================
      // STATIONERY
      // =====================

      prisma.stationary.count(),

      // =====================
      // INVENTORY
      // =====================

      prisma.inventory.aggregate({
        _sum: {
          quantity: true,
        },
      }),

      prisma.inventory.count({
        where: {
          status: "LOW_STOCK",
        },
      }),

      prisma.inventory.count({
        where: {
          status: "IN_STOCK",
        },
      }),

      prisma.inventory.count({
        where: {
          status: "OUT_OF_STOCK",
        },
      }),

      // =====================
      // AUTHORS
      // =====================

      prisma.author.count(),

      // =====================
      // EXPENSES
      // =====================

      prisma.expense.aggregate({
        _sum: {
          amount: true,
        },
      }),

      prisma.expense.groupBy({
        by: [
          "expenseCategoryId",
        ],

        _sum: {
          amount: true,
        },

        _count: {
          id: true,
        },
      }),

      prisma.expenseCategory.findMany({
        select: {
          id: true,
          categoryName: true,
        },
      }),

      // =====================
      // RETURNS
      // =====================

      prisma.bookReturn.count(),

      // =====================
      // RESERVATIONS
      // =====================

      prisma.bookReservation.count({
        where: {
          status: "ACTIVE",
        },
      }),

      // =====================
      // USERS
      // =====================

      prisma.user.count(),

    ]);


    // =====================
    // EXPENSE CATEGORY DATA
    // =====================

    const expenseByCategory = ExpenseGroupedByCategory.map((item) => {

      const category = expenseCategories.find(
        (cat) =>
          cat.id === item.expenseCategoryId
      );

      return {

        categoryId: item.expenseCategoryId,

        categoryName:
          category?.categoryName ?? "Unknown",

        totalAmount:
          Number(item._sum.amount ?? 0),

        totalExpenses:
          item._count.id,

      };

    });


    // =====================
    // RETURN OBJECT
    // =====================

    return {

      // =====================
      // BOOKS
      // =====================

      totalBooks,

      booksInStock,

      booksInLowStock,

      booksOutOfStock,

      AvgBookSellingPrice,

      HighestSellingPrice,

      LowestSellingPrice,

      TotalBookReservations,

      TotalReservedBooksQuantity:
        TotalReservedBooksQuantity._sum.quantity,

      BookReservations,


      // =====================
      // CUSTOMERS
      // =====================

      AllCustomers,


      // =====================
      // SUPPLIERS
      // =====================



      // =====================
      // EMPLOYEES
      // =====================

      totalEmployees,


      // =====================
      // STATIONERY
      // =====================

      totalStationery,


      // =====================
      // INVENTORY
      // =====================

      totalInventoryUnits:
        totalInventoryUnits._sum.quantity ?? 0,

      lowStockItems,

      InStockItems,

      OutOfStockItems,


      // =====================
      // AUTHORS
      // =====================

      totalAuthors,


      // =====================
      // EXPENSES
      // =====================

      totalExpenses:
        totalExpenses._sum.amount ?? 0,

      expenseByCategory,


      // =====================
      // RETURNS
      // =====================

      totalReturns,


      // =====================
      // RESERVATIONS
      // =====================

      activeReservations,


      // =====================
      // USERS
      // =====================

      totalUsers,

    };

  },

};