import { prisma } from "../../lib/prisma";

export const PurchaseModel = {

GetAllPurchase(status?: string) {
  return prisma.purchase.findMany({
    where: status
      ? {
          status: status as any, // or cast to your PurchaseStatus enum
        }
      : {},

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
},


// PurchasedItemasdasdas

GetAllPurchasedItem() {
  return prisma.purchaseItem.findMany({
    select: {
      id: true,
      quantity: true,
      costPrice: true,

      purchase: {
        select: {
          id: true,
          purchaseDate: true,
          status: true,
          supplier: {
            select: {
              companyName: true,
            },
          },
        },
      },

      book: {
        select: {
          id: true,
          bookTitle: true,
        },
      },

      stationary: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
},

 createPurchaseItem(data: any) {

  return prisma.$transaction(async (tx) => {

    // 1. Check if Purchase exists
    const purchase = await tx.purchase.findUnique({
      where: {
        id: data.purchaseId,
      },
    });


    if (!purchase) {
      throw new Error("Purchase not found");
    }


    // 2. Validate product
    if (!data.bookId && !data.stationaryId) {
      throw new Error("Book or Stationary is required");
    }


    if (data.bookId && data.stationaryId) {
      throw new Error("Purchase item cannot have both book and stationary");
    }


    await tx.purchase.update({
      where:{
        id:data.purchaseId
      },
      data:{
        status:"RECEIVED"
      }
    })


    // 3. Create Purchase Item
    const purchaseItem = await tx.purchaseItem.create({
      data: {
        purchaseId: data.purchaseId,
        bookId: data.bookId,
        stationaryId: data.stationaryId,
        quantity: data.quantity,
        costPrice: data.costPrice,
      },
    });


    // 4. Update Inventory

    if (data.bookId) {

      const inventory = await tx.inventory.findUnique({
        where: {
          bookId: data.bookId,
        },
      });


      if (inventory) {

        await tx.inventory.update({
          where: {
            id: inventory.id,
          },
          data: {
            quantity: {
              increment: data.quantity,
            },
          },
        });


      } else {

        await tx.inventory.create({
          data: {
            bookId: data.bookId,
            quantity: data.quantity,
          },
        });

      }

    }



    if (data.stationaryId) {

      const inventory = await tx.inventory.findUnique({
        where: {
          stationaryId: data.stationaryId,
        },
      });



      if (inventory) {

        await tx.inventory.update({
          where: {
            id: inventory.id,
          },
          data: {
                quantity: {
                  increment: data.quantity,
                },
          },
        });


      } else {

        await tx.inventory.create({
          data: {
            stationaryId: data.stationaryId,
            quantity: data.quantity,
          },
        });

      }

    }

    // 



    return purchaseItem;

  });

}
};