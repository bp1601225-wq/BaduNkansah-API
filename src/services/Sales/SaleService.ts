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

      // _count: {
      //   select: {
      //     items: true,
      //   },
      // },




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

    const {
      id,
      customerId,
      items,
      discount = 0,
      amountPaid,
      paymentMethod,
    } = data;

    // ==============================
    // VALIDATION
    // ==============================

    if (!id) {
      throw new Error(
        "The sale you are updating does not exist"
      );
    }

    if (!items || items.length === 0) {
      throw new Error(
        "A sale must contain at least one item"
      );
    }

    // ==============================
    // CUSTOMER
    // ==============================

    let customer = null;

    if (customerId) {
      customer = await tx.customer.findUnique({
        where: {
          id: customerId,
        },
      });

      if (!customer) {
        throw new Error(
          "The customer you are trying to assign does not exist"
        );
      }
    }

    // ==============================
    // GET EXISTING SALE
    // ==============================

    const existingSale = await tx.sale.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    if (!existingSale) {
      throw new Error("Sale does not exist");
    }

    // ==============================
    // GET BOOK IDS
    // ==============================

    const bookIds = items.map((item: any) => item.bookId);

    // ==============================
    // FIND BOOKS
    // ==============================

    const books = await tx.bookCatalog.findMany({
      where: {
        id: {
          in: bookIds,
        },
      },
    });

    if (books.length !== bookIds.length) {
      throw new Error(
        "One or more books do not exist"
      );
    }

    // ==============================
    // FIND INVENTORIES
    // ==============================

    const inventories = await tx.inventory.findMany({
      where: {
        bookId: {
          in: bookIds,
        },
      },
    });

    // ==============================
    // CALCULATE INVENTORY DIFFERENCE
    // ==============================

    for (const item of items) {

      // find all inventory with bookId
      const inventory = inventories.find(
        (inv: any) => inv.bookId === item.bookId
      );

      if (!inventory) {
        throw new Error(
          `No inventory exists for ${item.bookId}`
        );
      }

      // Find how many were previously sold
      const oldItem = existingSale.items.find(
        (old: any) => old.bookId === item.bookId
      );

      const oldQuantity = oldItem
        ? oldItem.quantity
        : 0;

      const newQuantity = Number(item.quantity);

      // Difference between old and new sale
      const quantityDifference =
        newQuantity - oldQuantity;

      // If quantity increased
      if (quantityDifference > 0) {

        if (
          inventory.quantity < quantityDifference
        ) {
          throw new Error(
            `Not enough stock for ${item.bookId}`
          );
        }

        await tx.inventory.updateMany({
          where: {
            bookId: item.bookId,
          },
          data: {
            quantity: {
              decrement: quantityDifference,
            },
          },
        });
      }

      // If quantity decreased
      if (quantityDifference < 0) {

        await tx.inventory.updateMany({
          where: {
            bookId: item.bookId,
          },
          data: {
            quantity: {
              increment: Math.abs(quantityDifference),
            },
          },
        });
      }
    }

    // ==============================
    // HANDLE REMOVED ITEMS
    // ==============================



    for (const oldItem of existingSale.items) {

      const stillExists = items.find(
        (item: any) =>
          item.bookId === oldItem.bookId
      );

      if (!stillExists) {

        await tx.inventory.updateMany({
          where: {
            bookId: oldItem.bookId,
          },
          data: {
            quantity: {
              increment: oldItem.quantity,
            },
          },
        });
      }
    }

    // ==============================
    // SALES CALCULATIONS
    // ==============================

    const subtotal = items.reduce(
      (acc: number, curr: any) => {
        return (
          acc +
          Number(curr.quantity) *
            Number(curr.unitPrice)
        );
      },
      0
    );

    // ==============================
    // DISCOUNT
    // ==============================

    const discountPercentage = Number(discount) || 0;

    const discountAmount =
      subtotal *
      (discountPercentage / 100);

    // ==============================
    // TAX
    // ==============================

    const tax = 0;

    // ==============================
    // TOTAL
    // ==============================

    const totalAmount =
      subtotal -
      discountAmount +
      tax;

    // ==============================
    // AMOUNT PAID
    // ==============================

    if (
      amountPaid === undefined ||
      amountPaid === null
    ) {
      throw new Error(
        "Enter a value for an amount paid"
      );
    }

    if (Number(amountPaid) < totalAmount) {
      throw new Error(
        "Amount paid cannot be less than the total amount"
      );
    }

    // ==============================
    // CHANGE
    // ==============================

    const changeAmount =
      Number(amountPaid) - totalAmount;

    // ==============================
    // UPDATE SALE
    // ==============================

    const updatedSale =
      await tx.sale.update({
        where: {
          id,
        },

        data: {
          customerId: customerId ?? null,

          subtotal,

          discount: discountAmount,

          tax,

          totalAmount,

          amountPaid: Number(amountPaid),

          changeAmount,

          paymentMethod,

          items: {
            deleteMany: {},

            create: items.map(
              (item: any) => ({
                bookId: item.bookId,
                quantity: Number(item.quantity),
                unitPrice: Number(item.unitPrice),
              })
            ),
          },
        },

        include: {
          items: true,
          customer: true,
        },
      });

    // ==============================
    // RETURN
    // ==============================

    return updatedSale;
  });
},




};