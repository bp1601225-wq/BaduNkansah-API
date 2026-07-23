import {prisma} from "../lib/prisma"

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

authorName:true,
biography:true,

    books: {
      select:{
        bookTitle:true,
      }
    },
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
  // Categories
  // =========================

  createCategory(data:any) {
return prisma.category.create({
  data
})

  },

  getAllCategories() {
return prisma.category.findMany({
  select:{
   categoryName:true,
   description:true,
   status:true,
      
    books:{
    select: {
      bookTitle:true,
    }
  
  }
      }
})
  },

  getCategoryById(id:string) {
return prisma.category.findUnique({
  where: {
    id
  },

  select:{
   categoryName:true,
   description:true,
   status:true,
      
 books: {
  select: {
    bookTitle: true,

    author: {
      select: {
        authorName: true,
        biography: true,
      },
    },
  },
}
      }

})
  },

  updateCategory(data:any) {

const {id, categoryName, description, status} = data

return prisma.category.update({
  where: {
    id
  },

  data:{
    categoryName,
    description,
    status
  }
})
  },


  deleteCategory(id:string) {
return prisma.category.delete({
  where:{
    id
  }
})
  },

  // =========================
  // Stationeries
  // =========================

// =========================
// Stationeries
// =========================

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