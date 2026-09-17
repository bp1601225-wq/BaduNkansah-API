import { BookCatalog } from "../../../generated/prisma/client"
import { ReservationStatus } from "../../../generated/prisma/enums"


export const BooksServices = {

getAll(model: any, quantity?: number, search?: string) {
  return model.findMany({
    select: {
      id: true,
      bookTitle: true,
      sellingPrice: true,
      status: true,

      author: {
        select: {
          authorName: true,
          biography: true,
        },
      },

      category: {
        select: {
          categoryName: true,
          description: true,
          status: true,
          createdAt: true,
        },
      },
    },

    where: {
      ...(quantity !== undefined
        ? {
            inventory: {
              quantity: {
                gte: quantity,
              },
            },
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                bookTitle: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                author: {
                  is: {
                    authorName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              },
              {
                category: {
                  is: {
                    categoryName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          }
        : {}),
    },
  });
},

// Create a book and add it to inventory
create(model: any, data: BookCatalog) {
  return model.$transaction(async (tx: any) => {

    const createdBook = await tx.bookCatalog.create({
      data
    })

    const inventory = await tx.inventory.create({
      data: {
        bookId: createdBook.id,
        quantity: 1
      }
    })

    return {
      createdBook,
      inventory
    }
  })
},

updateBooksService(model:any, data:any){
const {id, bookTitle,  sellingPrice, status} = data

if (!id) {
    throw new Error("The book you are trying to update does not exists")
}

return model.update({
    where:{
        id
    }, data:{
        bookTitle,
        sellingPrice,
        status,
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





//  Book Reservations (lOGIC Models
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
reservation.status !== "EXPIRED" &&
(data.status === "CANCELLED" || data.status === "EXPIRED")
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