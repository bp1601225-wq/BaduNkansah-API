import {prisma} from "../../lib/prisma"
import { GenerateAssetCode } from "../../UtilityFunctions/Utility";

export const AssetServices = {

GetAllAssets(){
    return prisma.assets.findMany({
        select:{
          id:true,
            assetCode:true,
            assetName:true,
            manufacturer:true,
            notes:true,
            location:true,
            purchaseDate:true,
            purchaseCost:true,
            category:true,
            assetType:true,
            status:true,
            supplierId:true,
        

                supplier:{
                    select:{
                        companyName:true,
                        contactName:true,
                        phone:true,
                        email:true,
                        address:true
                    }
                }

            
            
        }
    })
},




GetAssetById(id: string) {

  return prisma.assets.findUnique({

    where: {
      id
    },

    select: {

      id: true,

      assetCode: true,

      assetName: true,

      manufacturer: true,

      notes: true,

      location: true,

      description: true,

      purchaseDate: true,

      purchaseCost: true,

      category: true,

      assetType: true,

      status: true,

      quantity: true,

      supplierId: true,


      supplier: {

        select: {

          companyName: true,

          contactName: true,

          phone: true,

          email: true,

          address: true

        }

      },


      createdAt: true,

      updatedAt: true

    }

  });

},

CreateAssets(data: any) {

  const {
    assetName,
    manufacturer,
    notes,
    location,
    purchaseDate,
    purchaseCost,
    category,
    assetType,
    status,
    supplierId,
  } = data;

  return prisma.assets.create({
    data: {
      assetName,
      manufacturer,
      notes,
      location,
      purchaseDate: new Date(purchaseDate),
      purchaseCost,
      category,
      assetType,
      status,
      supplierId,
      assetCode: GenerateAssetCode(),
    },
  });
},


updateAssets(data: any) {

  const {
    id,
    assetName,
    category,
    type,
    status,
    quantity,
    manufacturer,
    serialNumber,
    purchaseDate,
    purchaseCost,
    location,
    notes,
    description,
    supplierId
  } = data;


  return prisma.assets.update({

    where: {
      id
    },

    data: {

      assetName,

      category,

      type,

      status,

      quantity,

      manufacturer,

      serialNumber,

      purchaseDate: purchaseDate
        ? new Date(purchaseDate)
        : undefined,

      purchaseCost,

      location,

      notes,

      description,

      supplierId

    }

  });
},


deleteAsset(id:string){
return prisma.assets.delete({
    where:{
        id
    }
})
}


}