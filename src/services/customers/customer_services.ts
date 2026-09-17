export const CustomerServices = {
getAll(model: any, search?: string) {
  const searchValue = search?.trim() || "";

  return model.findMany({
    where: searchValue
      ? {
          OR: [
            {
              firstName: {
                contains: searchValue,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: searchValue,
                mode: "insensitive",
    
              },
            },
            {
              email: {
                contains: searchValue,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: searchValue,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,

    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      address: true,
      type: true,
      status: true,
      notes: true,
      createdAt: true,

      sales: {
        select: {
          id: true,
          saleNumber: true,
          saleDate: true,
          subtotal: true,
          discount: true,
          tax: true,
          totalAmount: true,
          amountPaid: true,
          changeAmount: true,
          paymentMethod: true,
          status: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
},

  create(model: any, data: any) {
    return model.create({
      data,
    });
  },

  update(model: any, data: any) {
    const {
      id,
      firstName,
      lastName,
      phone,
      email,
      address,
      type,
      status,
      notes,
    } = data;

    return model.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        phone,
        email,
        address,
        type,
        status,
        notes,
      },
    });
  },

  delete(model: any, id: string) {
    return model.delete({
      where: {
        id,
      },
    });
  },

  getById(model: any, id: string) {
    return model.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        address: true,
        type: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,

        reservations: {
          select: {
            id: true,
            quantity: true,
            reservedDate: true,
            status: true,

            book: {
              select: {
                bookTitle: true,
                sellingPrice: true,
              },
            },
          },
          orderBy: {
            reservedDate: "desc",
          },
        },

        returns: {
          select: {
            id: true,
            quantity: true,
            reason: true,
            status: true,
            returnDate: true,

            orderItem: {
              select: {
                quantity: true,
                sellingPrice: true,

                book: {
                  select: {
                    bookTitle: true,
                  },
                },
              },
            },
          },
          orderBy: {
            returnDate: "desc",
          },
        },
      },
    });
  },



  // Fetch All Cusomers with Sales 
GetCustomerSales(model: any, search: string) {
  return model.findMany({
    where: {

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

    select: {
      // Customer information
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      type: true,
      status: true,

      // Customer's sales
      sales: {
        select: {
          id: true,
          saleNumber: true,
          saleDate: true,

          subtotal: true,
          discount: true,
          tax: true,
          totalAmount: true,
          amountPaid: true,
          changeAmount: true,

          paymentMethod: true,
          status: true,

          // Items belonging to this sale
          items: {
            select: {
              id: true,
              quantity: true,
              unitPrice: true,
              bookId: true,

              // Book information
              book: {
                select: {
                  id: true,
                  bookTitle: true,
                  isbn: true,

                  // Useful for displaying current book information
                  sellingPrice: true,
                  status: true,

                  // Author
                  author: {
                    select: {
                      id: true,
                      authorName: true,
                    },
                  },

                  // Category
                  category: {
                    select: {
                      id: true,
                      categoryName: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}
};