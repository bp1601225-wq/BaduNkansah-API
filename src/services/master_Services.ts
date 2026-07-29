import {prisma} from "../lib/prisma"
import { CategoryService, CategoryModels } from "./category_service";;

const MastersService = {
  // =========================
  // Authors
  // =========================

  createAuthor(data:any) {

    return prisma.author.create({
      data
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


 
createStationery(data: any) {
  return prisma.stationary.create({
    data,
  });
},

getAllStationeries() {
  return prisma.stationary.findMany({
    select: {
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
  const { id, name, description, status } = data;

  return prisma.stationary.update({
    where: {
      id,
    },

    data: {
      name,
      description,
      status,
    },
  });
},



deleteStationery(id: string) {
  return prisma.stationary.delete({
    where: {
      id,
    },
  });
},
};

export default MastersService;