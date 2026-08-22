
export const InventoryServices = {

getAllInventory(model:any){

return model.findMany({

select:{

id:true,

quantity:true,

status:true,

reason:true,

createdAt:true,

updatedAt:true,


    book:{

    select:{
    bookTitle:true,

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

},


stationary:{

select:{
name:true,
status:true
}

}


}

})

},

create(model:any, data:any){

    if(!data.bookId && !data.stationaryId){
        throw new Error(
            "Select either a book or stationery"
        );
    }


    if(data.bookId && data.stationaryId){
        throw new Error(
            "You cannot select both book and stationery"
        );
    }


    return model.create({

        data:{
            bookId: data.bookId || null,

            stationaryId: data.stationaryId || null,

            quantity: data.quantity,

            status: data.status,

            reason: data.reason
        }

    })

},



// update inventory 

async update(model: any, data: any) {
  const { id, reason, quantity } = data;

  if (!id || !reason || quantity === undefined) {
    throw new Error("Please provide all required fields");
  }

  const formattedQuantity = Number(quantity);

  if (Number.isNaN(formattedQuantity) || formattedQuantity < 0) {
    throw new Error("Quantity must be a valid non-negative number");
  }

  let status;

  if (formattedQuantity === 0) {
    status = "OUT_OF_STOCK";
  } else if (formattedQuantity <= 10) {
    status = "LOW_STOCK";
  } else {
    status = "IN_STOCK";
  }

  return await model.update({
    where: {
      id,
    },
    data: {
      reason,
      quantity: formattedQuantity,
      status,
    },
  });
}
// update(model:any, data:any){

//     const {id, reason, quantity, status} = data

// const formattedQuantity = Number(quantity)


// if (typeof formattedQuantity !== "number" || isNaN(formattedQuantity)) {
//   throw new Error("Quantity must be a valid number");
// }

//     return model.update({
//         where:{
//             id,
//         },

//         data:{
//             reason,
//             quantity:formattedQuantity,
//             status
//         }
//     })
// }







}