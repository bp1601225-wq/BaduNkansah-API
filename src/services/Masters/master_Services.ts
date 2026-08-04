import {prisma} from "../../lib/prisma"
import { CategoryService, CategoryModels } from "./category_service";;

const MastersService = {
  // =========================
  // Authors
  // =========================

  createAuthor(data:any) {

    return prisma.author.create({
      data:{
        ...data,
        createdAt:data

      }
    })
  
  },

  getAllAuthors() {
return prisma.author.findMany({
  select:{

id:true,
authorName:true,
biography:true,

    books: {
      select:{
        bookTitle:true,
      }
    },
  },
  orderBy:{
    createdAt:"desc"
  }
})
  },


  getAuthorById(authorId:string) {

return prisma.author.findUnique({
  where:{
id:authorId
  },

    select:{
    books: {
      select:{
        bookTitle:true,
          inventory:{
            select: {
              quantity:true,
              status:true
            }
          }
        
      }
    },



  }
})
  },

  updateAuthor(data:any) {

const {id, authorName, biography} = data

    return prisma.author.update({
      where:{
        id
      },  

      data:{
        authorName,
        biography
      }
    })

  },

  deleteAuthor(id:string) {
    return prisma.author.delete({
      where:{
        id
      }
    })
  },


  


  // =========================
  // Suppliers
  // =========================


 GetAllSuppliers(){
  return prisma.supplier.findMany({
    select: {
      id:true,
      companyName:true,
      contactName:true,
      phone:true,
      email:true,
      address:true,
    },

    orderBy:{
      createdAt:"desc"
    }
  })
 },



 CreatSuppliers(data:any){
  return prisma.supplier.create({
data
  })
 },


UpdateSuppliers(payload: any) {
  const { id, data } = payload;

  return prisma.supplier.update({
    where: {
      id,
    },
    data,
  });
},

DeleteSupplier(id:string){
  return prisma.supplier.delete({
    where:{
      id
    }
  })
},
 


//  Stationaries

createStationery(data: any) {
  return prisma.stationary.create({
    data,
  });
},

getAllStationeries() {
  return prisma.stationary.findMany({
    select: {
      id:true,
      name: true,
      description: true,
      status: true,

      inventory: {
        select: {
          quantity: true,
          status: true,
        },
      },
    },
  });
},

getStationeryById(id: string) {
  return prisma.stationary.findUnique({
    where: {
      id,
    },

    select: {
      name: true,
      description: true,
      status: true,

      inventory: {
        select: {
          quantity: true,
          status: true,
          reason: true,
        },
      },

      purchaseItems: {
        select: {
          quantity: true,
          costPrice: true,

          purchase: {
            select: {
              purchaseDate: true,
              status: true,
            },
          },
        },
      },
    },
  });
},

updateStationery(data: any) {

  return prisma.stationary.update({
    where: {
      id:data.id,
    },

    data
  });
},



deleteStationery(id: string) {
  return prisma.stationary.delete({
    where: {
      id,
    },
  });
},


// Stationary Reservations
createStationaryReservation(data: any) {

  return prisma.$transaction(async (tx) => {

    // Check if stationary exists in inventory
    const inventory = await tx.inventory.findUnique({
      where: {
        stationaryId: data.stationaryId
      }
    });

    if (!inventory) {
      throw new Error("No stationary exists in this inventory");
    }


    // Check available quantity
    if (inventory.quantity < data.quantity) {
      throw new Error(
        `Only ${inventory.quantity} items available`
      );
    }


    // Reduce inventory quantity
    await tx.inventory.update({
      where: {
        id: inventory.id
      },
      data: {
        quantity: inventory.quantity - data.quantity
      }
    });


    // Create reservation
    const reservation = await tx.stationeryReservation.create({
      data: {
        ...data,
        expiryDate: new Date(data.expiryDate),
      },
    });


    return reservation;
  });

},

getStationaryReservations (){
  return prisma.stationeryReservation.findMany({
    select:{
      id:true,
      quantity:true,
      reservedDate:true,
      status:true,
      notes:true,
        
         customer:{
          select:{
            firstName:true,
            lastName:true,
            phone:true,
            email:true,
            address:true
          }
         },

            stationary:{
              select:{
                name:true,
                description:true
              }
            }

          

    }
  })
},

updateStationaryReservationStatus(data: any) {
return prisma.$transaction(async (tx)=>{

const reservation = await tx.stationeryReservation.findUnique({
  where: {
    id: data.id,
  },
});

if (!reservation){
  throw new Error("Reservation not found")
}


const inventory = await tx.inventory.findUnique({
  where:{
    stationaryId: reservation.stationaryId
  }
})

if (!inventory){
  throw new Error ("No inventory found")
}



switch (data.status) {

  case "COLLECTED":

    if (inventory.quantity < reservation.quantity) {
      throw new Error("Insufficient inventory.");
    }

    await tx.inventory.update({
      where: {
        stationaryId: reservation.stationaryId,
      },
      data: {
        quantity: {
          decrement: reservation.quantity,
        },
      },
    });

    break;

  case "CANCELLED":

    await tx.inventory.update({
      where: {
        stationaryId: reservation.stationaryId,
      },
      data: {
        quantity: {
          increment: reservation.quantity,
        },
      },
    });

    break;

  case "ACTIVE":
  await tx.inventory.update({
      where: {
        stationaryId: reservation.stationaryId,
      },
      data: {
        quantity: {
          increment: reservation.quantity,
        },
      },
    });
  break;

  case "EXPIRED":
    // No inventory update
    break;

  default:
    throw new Error("Invalid reservation status.");
}
})

}


}








export default MastersService;