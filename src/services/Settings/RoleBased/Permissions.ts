export const PermissionServices = {

  // Get all permissions
  getAll(model: any) {
    return model.findMany({
      include: {
        role: true,
      },
    });
  },

  // Create permissions for a role
  create(model: any, data: any) {
    const {
      roleId,
      module,
      view,
      create,
      edit,
      delete: remove,
      approve,
      print,
      export: exportPermission,
    } = data;

    if (!roleId) {
      throw new Error("Role is required");
    }

    if (!module) {
      throw new Error("Module is required");
    }

    return model.create({
      data: {
        roleId,
        module,
        view,
        create,
        edit,
        delete: remove,
        approve,
        print,
        export: exportPermission,
      },
    });
  },

  // Update permissions
  update(model: any, data: any) {
    const {
      id,
      view,
      create,
      edit,
      delete: remove,
      approve,
      print,
      export: exportPermission,
    } = data;

    return model.update({
      where: {
        id,
      },
      data: {
        view,
        create,
        edit,
        delete: remove,
        approve,
        print,
        export: exportPermission,
      },
    });
  },

  // Delete permissions
  delete(model: any, id: string) {
    return model.delete({
      where: {
        id,
      },
    });
  },

};