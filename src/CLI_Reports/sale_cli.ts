import { prisma } from "../lib/prisma"
import { dateFilters } from "./dateCli"

async function SalesReports(){

  
  const args = process.argv.slice(2)

const command = args[0]
const period = args[1]

// console.log("START:", dateFilters.Last7Days().gte)
// console.log("END:", dateFilters.Last7Days().lte)


let sales:any[] = []

if (command === "sales" && period === "today"){
  sales = await prisma.sale.findMany({
    where:{
      saleDate:{
        ...dateFilters.Today()
      }
    }
  })
}

else if (command == "sales" && period === "last_7_days"){
  sales = await prisma.sale.findMany({
    where:{
      saleDate:{
        ...dateFilters.Last7Days()
      }
    }
  })
}


else if (command == "sales" && period === "last_6_months"){
sales = await prisma.sale.findMany({
  where:{
    saleDate:{
      ...dateFilters.LastSixMonths()
    }
  }
})
} 


console.log(`Generating sale reports for ....`, period)

console.log(`Total sale reports for ....`, period, sales?.length)


// console.log(sales)

}


SalesReports()