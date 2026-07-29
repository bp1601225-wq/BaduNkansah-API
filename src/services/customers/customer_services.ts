export const CustomerServices = {
  getAll(model: any) {
    return model.findMany({
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
};