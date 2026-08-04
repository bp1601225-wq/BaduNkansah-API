export const RoleServices = {

  // Get all roles
getAll(model: any) {
  return model.findMany({
    select: {
      id: true,
      roleName: true,
      description: true,
      employees: true,
      permissions: true,
      createdAt:true,
      updatedAt:true
    },
  });
},
  // Create role
  create(model: any, data: any) {

    const { roleName, description } = data;


    return model.create({
      data: {
        roleName,
        description
      },
    });

  },

  // Update role
  update(model: any, data: any) {

    const { id, roleName, description } = data;

  
    return model.update({
      where: {
        id,
      },
      data: {
        roleName,
        description
      },
    });

  },

  // Delete role
  delete(model: any, id: string) {

    return model.delete({
      where: {
        id,
      },
    });

  },

};