
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
name:true
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

update(model:any, data:any){

    const {id, bookId, stationaryId, quantity, status} = data

    return model.update({
        where:{
            id,
        },

        data:{
            bookId,
            stationaryId,
            quantity,
            status
        }
    })
}







}