import { prisma } from "../../lib/prisma";

export const PurchaseModel = {

  GetAllPurchase() {
    return prisma.purchase.findMany({
      select: {
        id: true,

        supplierId: true,

        purchaseDate: true,

        status: true,


        supplier: {
          select: {
            companyName: true,
            contactName: true,
            phone: true,
            email: true,
            address: true,
            status: true,
          },
        },


        items: {
          select: {
            id: true,

            quantity: true,

            costPrice: true,


            book: {
              select: {
                id: true,
                bookTitle: true,
                sellingPrice: true,
              },
            },


            stationary: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },


        createdAt: true,

        updatedAt: true,
      },
    });
  },


  GetPurchaseById(id:string){

    return prisma.purchase.findUnique({
      where:{
        id
      },

      select:{
        id:true,

        supplierId:true,

        purchaseDate:true,

        status:true,


        supplier:{
          select:{
            companyName:true,
            contactName:true,
            phone:true,
            email:true,
            address:true
          }
        },


        items:{
          select:{
            id:true,
            quantity:true,
            costPrice:true,


            book:{
              select:{
                bookTitle:true
              }
            },


            stationary:{
              select:{
                name:true
              }
            }
          }
        }
      }
    })

  },


CreatePurchase(data:any){

  const {
    supplierId,
    purchaseDate,
    status
  } = data;


  return prisma.purchase.create({

    data:{

      supplierId,

      purchaseDate: purchaseDate 
        ? new Date(purchaseDate) 
        : new Date(),

      status

    }

  });

},


updatePurchase(data: any) {
  return prisma.purchase.update({
    where: {
      id: data.id,
    },
    data: {
      supplierId: data.supplierId,
      purchaseDate: new Date(data.purchaseDate),
      status: data.status,
    },
  });
}

};