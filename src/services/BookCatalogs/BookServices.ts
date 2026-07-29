import { ReservationStatus } from "../../../generated/prisma/enums"


export const BooksServices = {

getAll(model:any){
return model.findMany({
    
 select:{
    id:true,
    bookTitle:true,
            // buyingPrice:true,
            sellingPrice:true,
            status:true,
             
                author: {
                    select:{
                        authorName:true,
                        biography:true,

                    }
                },

                category:{
                    select:{
                        categoryName:true,
                        description:true,
                        status:true,
                        createdAt:true
                    }
                },

           
        }


})



},

  create(model:any, data:any){

    return model.create({

        data:{
            ...data,

            reservedDate: data.reservedDate
            ? new Date(data.reservedDate)
            : new Date(),

            expiryDate: data.expiryDate
            ? new Date(data.expiryDate)
            : new Date(),

        }

    })

},

    update(model:any, data:any){
const {id, bookTitle, buyingPrice, sellingPrice, status, isbn} = data

        return model.update({
            where:{
                id
            }, data:{
                bookTitle,
                buyingPrice,
                sellingPrice,
                status,
                isbn
            }
        })
    },

    delete(model:any, id:string){


        return model.delete({
            where:{
                id
            }
        })
    },

     getById(model:any, id:string){
        return model.findUnique({
            where:{
                id
            },

            select:{
            bookTitle:true,
            buyingPrice:true,
            sellingPrice:true,
            status:true,
             
                author: {
                    select:{
                        authorName:true,
                        biography:true,

                    }
                },

                category:{
                    select:{
                        categoryName:true,
                        description:true,
                        status:true,
                        createdAt:true
                    }
                },

                reservations:{
                    select:{
                        quantity:true,
                        reservedDate:true,

                        customer:{
                            select:{
                            
                            }
                        }
                    }
                },

                orderBy:{
                    createdAt:"desc"
                }
        }
        })

     
     },

    //  Book Reservations (lOGIC Models)


    // decrease inventory by reserved quantity. (COLLECTED)
Create_reservation(model: any, data: any) {

  return model.$transaction(async (tx: any) => {


    // 1. Check if book has inventory
    const inventory = await tx.inventory.findUnique({
      where: {
        bookId: data.bookId
      }
    });


    if (!inventory) {
      throw new Error("No inventory found for this book");
    }



    // 2. Check available quantity
    if (inventory.quantity < data.quantity) {
      throw new Error(
        `Only ${inventory.quantity} books available`
      );
    }



    // 3. Reduce inventory quantity
    await tx.inventory.update({
      where: {
        bookId: data.bookId
      },
      data: {
        quantity: inventory.quantity - data.quantity
      }
    });



    // 4. Create reservation
    const reservation = await tx.bookReservation.create({
      data: {
        customerId: data.customerId,
        bookId: data.bookId,
      quantity: data.quantity,

expiryDate: data.expiryDate
  ? new Date(data.expiryDate).toISOString()
  : new Date().toISOString(),
        notes: data.notes
      },

      include: {
        customer: true,
        book: true
      }
    });



    // 5. Return created reservation
    return reservation;

  });

},


// Add the reserved quantity back to inventory (CANCELLED)
UpdateReservationStatus(model: any, data: any) {
  return model.$transaction(async (tx: any) => {

    // Find reservation
    const reservation = await tx.bookReservation.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!reservation) {
      throw new Error("Reservation not found");
    }
    // If cancelling, restore inventory
    if (
      reservation.status !== "CANCELLED" &&
      data.status === "CANCELLED"
    ) {
      const inventory = await tx.inventory.findUnique({
        where: {
          bookId: reservation.bookId,
        },
      });

      if (!inventory) {
        throw new Error("Inventory not found");
      }

      await tx.inventory.update({
        where: {
          bookId: reservation.bookId,
        },
        data: {
          quantity: inventory.quantity + reservation.quantity,
        },
      });
    }

    // Update reservation status
    const updatedReservation = await tx.bookReservation.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });

    return updatedReservation;
  });
},

getReservations(model:any){
    return model.findMany({

        select:{

            id:true,

            quantity:true,

            reservedDate:true,

            expiryDate:true,

            status:true,

            notes:true,

            createdAt:true,


            customer:{
                select:{
                    firstName:true,
                    lastName:true,
                    phone:true,
                    email:true,
                }
            },


            book:{
                select:{
                  id:true,
                    bookTitle:true,
                    sellingPrice:true,
                    isbn:true,

                    author:{
                        select:{
                            authorName:true
                        }
                    },

                    category:{
                        select:{
                            categoryName:true
                        }
                    }
                }
            }

        },

        // orderBy:{
        //     createdAt:"desc"
        // }

    })
}






    }




    // async GetAllBooksCatalogs(){
    //     return prisma.bookCatalog.