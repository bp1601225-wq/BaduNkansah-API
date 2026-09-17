import { CustomerController } from "../../controller/customer_controller";
import { prisma } from "../../lib/prisma";

export const SalesServiceModel = {


GetAllSales(search?: string) {
  return prisma.sale.findMany({
    where: {
      ...(search
        ? {
      OR: [
  {
    saleNumber: {
      contains: search,
      mode: "insensitive",
    },
  },
  {
    customer: {
      is: {
        OR: [
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
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
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    },
  },
  {
    items: {
      some: {
        book: {
          bookTitle: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    },
  },
],
          }
        : {}),
    },

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

      items: {
        select: {
          bookId: true,
          quantity: true,
          unitPrice: true,

          book: {
            select: {
              bookTitle: true,
            },
          },
        },
      },

      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          email: true,
          address: true,
        },
      },
    },
  });
},

// Create sales

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


  

updateSales(data: any) {
  return prisma.$transaction(async (tx) => {

    // ==============================
    // 1. FIND OLD SALE
    // ==============================

    let sale = null;

    if (data.id) {
      sale = await tx.sale.findUnique({
        where: {
          id: data.id,
        },
        include: {
          items: true,
        },
      });
    }

    if (!sale) {
      throw new Error(
        "The sale you are trying to update does not exist"
      );
    }

    // ==============================
    // 2. GET OLD SALE ITEMS
    // ==============================

    const oldItems = sale.items;

    // ==============================
    // 3. RESTORE OLD INVENTORY
    // ==============================

    for (const item of oldItems) {
      await tx.inventory.updateMany({
        where: {
          bookId: item.bookId,
        },
        data: {
          quantity: {
            increment: item.quantity,
          },
        },
      });
    }

    // ==============================
    // 4. CUSTOMER
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
    // 5. GET NEW BOOK IDS
    // ==============================

    const bookIds = data.items.map((item: any) => {
      return item.bookId;
    });

    // ==============================
    // 6. FIND NEW BOOKS
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
    // 7. FIND NEW INVENTORIES
    // ==============================

    const inventories = await tx.inventory.findMany({
      where: {
        bookId: {
          in: bookIds,
        },
      },
    });

    // ==============================
    // 8. CHECK NEW INVENTORY
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
    // 9. SALES CALCULATIONS
    // ==============================

    const subtotal = data.items.reduce(
      (acc: number, curr: any) => {
        return acc + curr.quantity * curr.unitPrice;
      },
      0
    );

    // ==============================
    // 10. DISCOUNT
    // ==============================

    const discountPercentage = data.discount || 0;

    const discount =
      subtotal * (discountPercentage / 100);

    // ==============================
    // 11. TAX
    // ==============================

    const tax = 0;

    // ==============================
    // 12. TOTAL
    // ==============================

    const totalAmount =
      subtotal - discount + tax;

    // ==============================
    // 13. AMOUNT PAID
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
    // 14. CHANGE
    // ==============================

    const changeAmount =
      amountPaid - totalAmount;

    // ==============================
    // 15. UPDATE SALE
    // ==============================

    const updatedSale = await tx.sale.update({
      where: {
        id: data.id,
      },

      data: {
        customerId: data.customerId ?? null,

        subtotal,
        discount,
        tax,
        totalAmount,
        amountPaid,
        changeAmount,

        paymentMethod: data.paymentMethod,

        items: {
          deleteMany: {},

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
    // 16. REDUCE INVENTORY
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
    // 17. RETURN UPDATED SALE
    // ==============================

    return updatedSale;
  });
},





};