import { prisma } from "../../lib/prisma";

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








// Customers


      totalCustomers,

      // Suppliers
      totalSuppliers,
      activeSuppliers,
      inactiveSuppliers,

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

      // Purchases
      totalPurchases,
      pendingPurchases,
      completedPurchases,

      // Expenses
      totalExpenses,
      ExpenseGroupedByCategory,
      expenseCategories,

      // Returns
      totalReturns,

      // Reservations
      activeReservations,

      // Purchase Items
      purchaseItems,

    ] = await Promise.all([


      // Books
prisma.bookCatalog.count(),


 prisma.inventory.count({
  where: {
    bookId: {
      not: null,
    },
    status: "IN_STOCK",
  },
}),

await prisma.inventory.count({
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

await prisma.bookCatalog.aggregate({
  _avg: {
    sellingPrice: true,
  },
}),

await prisma.bookCatalog.aggregate({
  _max: {
    sellingPrice: true,
  },
}),

await prisma.bookCatalog.aggregate({
  _min: {
    sellingPrice: true,
  },
}),


await prisma.bookReservation.count(),

await prisma.bookReservation.aggregate({
  _sum: {
    quantity: true,
  },
}),



      // Customers
      prisma.bookReservation.count(),



      // =====================
      // SUPPLIERS
      // =====================

      prisma.supplier.count(),


      prisma.supplier.count({
        where:{
          status:"ACTIVE"
        }
      }),


      prisma.supplier.count({
        where:{
          status:"INACTIVE"
        }
      }),



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
        _sum:{
          quantity:true
        }
      }),


      prisma.inventory.count({
        where:{
          status:"LOW_STOCK"
        }
      }),


      prisma.inventory.count({
        where:{
          status:"IN_STOCK"
        }
      }),


      prisma.inventory.count({
        where:{
          status:"OUT_OF_STOCK"
        }
      }),




      // =====================
      // AUTHORS
      // =====================

      prisma.author.count(),




      // =====================
      // PURCHASES
      // =====================

      prisma.purchase.count(),


      prisma.purchase.count({
        where:{
          status:"PENDING"
        }
      }),


      prisma.purchase.count({
        where:{
          status:"COMPLETED"
        }
      }),





      // =====================
      // EXPENSES
      // =====================


      prisma.expense.aggregate({
        _sum:{
          amount:true
        }
      }),



      prisma.expense.groupBy({

        by:[
          "expenseCategoryId"
        ],

        _sum:{
          amount:true
        },

        _count:{
          id:true
        }

      }),



      prisma.expenseCategory.findMany({

        select:{
          id:true,
          categoryName:true
        }

      }),





      // =====================
      // RETURNS
      // =====================

      prisma.bookReturn.count(),




      // =====================
      // RESERVATIONS
      // =====================

      prisma.bookReservation.count({
        where:{
          status:"ACTIVE"
        }
      }),




      // =====================
      // PURCHASE ITEMS
      // =====================

      prisma.purchaseItem.findMany({

        select:{
          costPrice:true,
          quantity:true
        }

      })

    ]);




    // Calculate purchase cost

    const totalPurchaseCost = purchaseItems.reduce(

      (sum,item)=>
        sum + Number(item.costPrice) * item.quantity,

      0

    );




    // Format expense category data

    const expenseByCategory = ExpenseGroupedByCategory.map((item)=>{


      const category = expenseCategories.find(

        (cat)=>
          cat.id === item.expenseCategoryId

      );


      return {

        categoryId:item.expenseCategoryId,

        categoryName:
          category?.categoryName ?? "Unknown",

        totalAmount:
          Number(item._sum.amount ?? 0),

        totalExpenses:
          item._count.id

      };


    });






    return {


      // =====================
      // BASIC COUNTS
      // =====================

      totalBooks,

      booksInStock,
      booksInLowStock,
      booksOutOfStock,
      AvgBookSellingPrice,
      HighestSellingPrice,
      LowestSellingPrice,
      TotalBookReservations,
      TotalReservedBooksQuantity:TotalReservedBooksQuantity._sum.quantity ,



    //   cusomers

      totalCustomers,



      // =====================
      // SUPPLIERS
      // =====================

      totalSuppliers,

      activeSuppliers,

      inactiveSuppliers,



      // =====================
      // STAFF
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
      // PURCHASES
      // =====================

      totalPurchases,

      pendingPurchases,

      completedPurchases,


      totalPurchaseCost,



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


    };

  },

};