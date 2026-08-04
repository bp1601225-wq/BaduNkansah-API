export const EmployeeServices = {

  // Get all employees
getAll(model: any) {
  return model.findMany({
    select: {
      id: true,
      fullName: true,
      phoneNumber: true,


      salary: true,
      status: true,
      hireDate: true,
      createdAt: true,
      updatedAt: true,
      roleId:true,

      role: {
        select: {
          roleName: true,
        },
      },
    },
  });
},

  // Get single employee
  getById(model: any, id: string) {
    return model.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        salary: true,
        status: true,
        hireDate: true,
        createdAt: true,
        updatedAt: true,

        role: {
          select: {
            roleName: true,
          },
        },
      },
    });
  },


  // Create employee
create(model: any, data: any) {

  return model.create({
    data: {
      ...data,

      hireDate: data.hireDate
        ? new Date(data.hireDate).toISOString()
        : undefined,
    },
  });

},


  // Update employee
  update(model: any, data: any) {
    const {
      id,
      fullName,
      phoneNumber,
      salary,
      status,
      roleId,
    } = data;


    return model.update({
      where: {
        id,
      },

      data: {
        fullName,
        phoneNumber,
        salary,
        status,

        ...(roleId && {
          role: {
            connect: {
              id: roleId,
            },
          },
        }),
      },
    });
  },


  // Delete employee
  delete(model: any, id: string) {
    return model.delete({
      where: {
        id,
      },
    });
  },

};