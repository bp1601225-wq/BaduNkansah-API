import { prisma } from "../../lib/prisma";

export const SalesServiceModel = {

GetAllSales(data?: any) {
  return prisma.sale.findMany({
    select: {
      id: true,
      saleNumber: true,
      saleDate: true,

      customerId: true,

      subtotal: true,
      discount: true,
      tax: true,
      totalAmount: true,

      amountPaid: true,
      changeAmount: true,

      paymentMethod: true,
      status: true,

      _count: {
        select: {
          items: true,
        },
      },

            customer:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true,
                    phone:true,
                    email:true,
                    address:true
                }
            }
        
    },
  });
},

  CreateSales(data: any) {
    return prisma.$transaction(async (tx) => {
      // ==============================
      // CUSTOMER
      // ==============================

      let customer = null;

      if (data.customerId) {
        customer = await tx.customer.findUnique({
          where: {
            id: data.customerId,
          },
        });

        if (!customer) {
          throw new Error("Customer does not exist");
        }
      }

      // ==============================
      // GET BOOK IDS
      // ==============================

      const bookIds = data.items.map((item: any) => {
        return item.bookId;
      });

      // ==============================
      // FIND ALL BOOKS
      // ==============================

      const books = await tx.bookCatalog.findMany({
        where: {
          id: {
            in: bookIds,
          },
        },
      });

      if (bookIds.length !== books.length) {
        throw new Error("One or more books do not exist");
      }

      // ==============================
      // FIND ALL INVENTORIES
      // ==============================

      const inventories = await tx.inventory.findMany({
        where: {
          bookId: {
            in: bookIds,
          },
        },
      });

      // ==============================
      // CHECK INVENTORY
      // ==============================

      for (const item of data.items) {
        const inventory = inventories.find(
          (inv: any) => inv.bookId === item.bookId
        );

        if (!inventory) {
          throw new Error(
            `No inventory exists for ${item.bookId}`
          );
        }

        if (inventory.quantity < item.quantity) {
          throw new Error(
            `Not enough stock for ${item.bookId}`
          );
        }
      }

      // ==============================
      // SALES CALCULATIONS
      // ==============================

      const subtotal = data.items.reduce(
        (acc: number, curr: any) => {
          return acc + curr.quantity * curr.unitPrice;
        },
        0
      );

      // ==============================
      // DISCOUNT
      // ==============================

      const discountPercentage = data.discount || 0;

      const discount =
        subtotal * (discountPercentage / 100);

      // ==============================
      // TAX
      // ==============================

      const tax = 0;

      // ==============================
      // TOTAL
      // ==============================

      const totalAmount =
        subtotal - discount + tax;

      // ==============================
      // AMOUNT PAID
      // ==============================

      const amountPaid = data.amountPaid;

      if (
        amountPaid === undefined ||
        amountPaid === null
      ) {
        throw new Error(
          "Enter a value for an amount paid"
        );
      }

      if (amountPaid < totalAmount) {
        throw new Error(
          "Amount paid cannot be less than the total amount"
        );
      }

      // ==============================
      // CHANGE
      // ==============================

      const changeAmount =
        amountPaid - totalAmount;

      // ==============================
      // SALE NUMBER
      // ==============================

      const saleNumber = `SALE-NO: ${Date.now()}`;

      // ==============================
      // CREATE SALE
      // ==============================

      const sale = await tx.sale.create({
        data: {
          customerId: data.customerId ?? null,

          saleNumber,

          subtotal,
          discount,
          tax,
          totalAmount,
          amountPaid,
          changeAmount,

          paymentMethod: data.paymentMethod,

          items: {
            create: data.items.map((item: any) => ({
              bookId: item.bookId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
          },
        },

        include: {
          items: true,
        },
      });

      // ==============================
      // REDUCE INVENTORY
      // ==============================

      for (const item of data.items) {
        await tx.inventory.updateMany({
          where: {
            bookId: item.bookId,
          },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      // ==============================
      // RETURN SALE
      // ==============================

      return sale;
    });
  },
};