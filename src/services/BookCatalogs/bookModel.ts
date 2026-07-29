
import {prisma} from "../../lib/prisma"


export const BookModels = {
  books: prisma.bookCatalog,
  reservations: prisma.bookReservation,
  inventory: prisma.inventory,
  prisma: prisma
}