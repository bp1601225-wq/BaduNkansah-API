import { prisma } from "../lib/prisma";

export const CategoryModels = {
  book: prisma.bookCategory,
  maintenance: prisma.maintenanceCategory,
  expense: prisma.expenseCategory,
};

export const CategoryService = {
  create(model: any, data: any) {
    return model.create({ data });
  },

  getAll(model: any) {
    return model.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getById(model: any, id: string) {
return model.findUnique({
      where: { id },
    });
  },

  update(model: any, data: any) {
    const { id, categoryName, description, status } = data;

    return model.update({
      where: { id },
      data: {
        categoryName,
        description,
        status,
      },
    });
  },

  delete(model: any, id: string) {
    return model.delete({
      where: { id },
    });
  },
};