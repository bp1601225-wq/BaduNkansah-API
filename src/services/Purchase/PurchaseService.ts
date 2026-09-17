import { prisma } from "../../lib/prisma";

export const PurchaseModel = {

GetAllPurchase(status?: string, search?:string) {
  return prisma.purchase.findMany({
  
where:{

...(status && {
  status:status as any
}),

...(search && {
  supplier:{
    is:{
      OR:[
        {
            companyName: {
              contains: search,
              mode: "insensitive",
            },
          }, {
            contactName: {
              contains: search,
              mode: "insensitive",
            },
          }, {
            phone: {
              contains: search,
              mode: "insensitive",
            },
          }, {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
      ]
    }
  }
})

},



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

    orderBy:{
      createdAt:"desc"
    }
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

},

async updatePurchase(data: any) {
  return prisma.$transaction(async (tx) => {

    // 1. Find the purchase
    const purchaseData = await tx.purchase.findUnique({
      where: {
        id: data.id,
      },
      include: {
        items: true,
      },
    });

    if (!purchaseData) {
      throw new Error("The record you are updating does not exist");
    }

    const { items } = purchaseData;

    // 2. Prevent status change when quantity is 0
    if (data.status !== "PENDING") {
      for (const item of items) {
        if (item.quantity === 0) {
          throw new Error(
            "Cannot change status when quantity is 0"
          );
        }
      }
    }

    // 3. Update Purchase status
    const updatedPurchase = await tx.purchase.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });

    // 4. Update PurchaseItem quantity
    for (const item of items) {

      const oldQuantity = Number(item.quantity);
      const newQuantity = Number(data.quantity);

      // Compare old quantity with new quantity
      const quantityDifference = newQuantity - oldQuantity;

      console.log("Old Quantity:", oldQuantity);
      console.log("New Quantity:", newQuantity);
      console.log("Difference:", quantityDifference);

      // Update PurchaseItem
      await tx.purchaseItem.update({
        where: {
          id: item.id,
        },
        data: {
          quantity: newQuantity,
        },
      });

      // 5. Update inventory using the difference
      if (quantityDifference !== 0) {

        const existingInventory = await tx.inventory.findFirst({
          where: {
            bookId: item.bookId,
          },
        });

        if (!existingInventory) {
          throw new Error(
            "Inventory record not found for this purchase item"
          );
        }

        await tx.inventory.update({
          where: {
            id: existingInventory.id,
          },
          data: {
            quantity: {
              increment: quantityDifference,
            },
          },
        });
      }
    }

    return updatedPurchase;
  });
}

};