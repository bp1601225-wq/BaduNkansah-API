import { Author } from "../../../../generated/prisma/client"
import { prisma } from "../../../lib/prisma"

async function GetBooksKPIServices(){

const [
TotalBooks,

GroupedBySellingPrice

] = await Promise.all([
    prisma.bookCatalog.count(),

 await prisma.author.findMany({
  select: {
    authorName: true,
    books:{
        select:{
            sellingPrice:true,
            bookTitle:true
        },
    },

    _count: {
      select: {
        books: true,
      },
    },

    
  },
}),









])


return {

    TotalBooks,

    GroupedBySellingPrice
    

}



}

export default GetBooksKPIServices