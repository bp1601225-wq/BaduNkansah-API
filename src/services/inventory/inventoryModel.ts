
import {prisma} from "../../lib/prisma"


export const InventoryModel = {
  Inventory: prisma.inventory,
  prisma: prisma
}