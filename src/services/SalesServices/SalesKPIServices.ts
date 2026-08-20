import { Prisma } from "../../../generated/prisma/client"
import {prisma} from "../../lib/prisma"

export const DetailedSalesKPI = {

async GetAllKPI(){

const [

totalSalesCount,


RecentSales,


// totalDiscountCount
discountCount,


// Payment Method Counts
CashPaymentSale,

MomoPaymentSale,

CardPaymentSale,

BankTransferPaymentSale,

// All total sales calculations momey
totalAmountOfSales,

totalDiscountAmount, 

totalAmountPaid,

// All sales Item
CountOfItemsForSale,

// Gross Sales Calculations
GrossSales,


// inventory
inventory,

// GroupedBy Payment Method
PaymentMethodsStats,


] = await Promise.all([

// Total Saless~~
prisma.sale.count(),

// recent sales
prisma.sale.findMany({
  select: {
    discount: true,
    totalAmount: true,
    amountPaid: true,
    saleNumber: true,
    paymentMethod: true,
    createdAt: true,

    customer: {
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    },

    items: {
      select: {
        quantity: true,
        unitPrice: true,

            book:{
                select:{
                    bookTitle:true,

                    author:{
                      select:{
                        authorName:true
                      }
                    }
                }
            }
      },
    },

  },

  orderBy: {
    createdAt: "desc",
  },

  take: 5,
}),


// discountCount
prisma.sale.count({
where:{
discount:{
gt:0
}
}
}),

// Count of all payment methods for sale transactions
prisma.sale.count({
where:{
paymentMethod: "CASH"
}
}),

prisma.sale.count({
where:{
paymentMethod:"MOBILE_MONEY"
}
}),

prisma.sale.count({
where:{
paymentMethod:"CARD"
}
}),

prisma.sale.count({
where:{
paymentMethod:"BANK_TRANSFER"
}
}),


// total sales amount
prisma.sale.aggregate({
_sum:{
totalAmount:true
}
}),

// totalDiscountAmmount
prisma.sale.aggregate({
_sum:{
discount:true
}
}),

prisma.sale.aggregate({
_sum:{
amountPaid:true
}
}),

prisma.saleItem.aggregate({
_sum:{
quantity:true
}
}),

// gross sale

prisma.saleItem.findMany({
select:{
quantity:true,
unitPrice:true
}
}),


prisma.inventory.aggregate({
  _sum:{
    quantity:true
  }, where:{
    bookId:{
      not:null
    }
  }
}),

prisma.sale.groupBy({
  by:["paymentMethod"],
  // _count:true,
  _sum:{
    totalAmount:true,
    amountPaid:true
  }
})

])


// Gross Sale Calculation

const totalGrossSale =

GrossSales.reduce((acc:any, curr:any)=>{
return acc + (curr.quantity * curr.unitPrice)
},0)



// Recent sales KPI
// const  Formatted_RecenSales = RecentSales.slice(0, 5)

const  Formatted_RecenSales = RecentSales


// discount Rate

const discountAmount = Number(totalDiscountAmount._sum.discount ?? 0)

const discountRate = (discountAmount / totalGrossSale) * 100

// ================================================================
// SELL-THROUGH RATE
// Sell-Through Rate = Items Sold ÷ Total Available Inventory × 100
// Total Available Inventory = Current Inventory + Items Sold
// ================================================================
const totalInventory = inventory._sum.quantity || 0;

const QuantityOfItemsSold =
  CountOfItemsForSale._sum.quantity || 0;

const totalAvailableInventory =
  totalInventory + QuantityOfItemsSold;

const SellThroughRate =
  totalAvailableInventory > 0
    ? (QuantityOfItemsSold / totalAvailableInventory) * 100
    : 0;





    // .......................................................
  const AmountPaid = totalAmountPaid._sum.amountPaid


const CollectionRate = (Number(AmountPaid) / totalGrossSale) * 100

    // .......................................................
// Payment Method
const PaymentMethodsCals = PaymentMethodsStats.map((items:any)=>{

  const {_sum, paymentMethod} = items

const {totalAmount, amountPaid} = _sum

return {
  totalAmount,
  amountPaid,
  paymentMethod
}


})


    
// Actual Returned API
return {
totalSalesCount,

totalGrossSale,


Formatted_RecenSales,

discountCount,

CashPaymentSale,

MomoPaymentSale,

CardPaymentSale,

BankTransferPaymentSale,

// Money calculatons
totalAmountOfSales:totalAmountOfSales._sum.totalAmount,

totalDiscountAmount:totalDiscountAmount._sum.discount,

totalAmountPaid:totalAmountPaid._sum.amountPaid,

CountOfItemsForSale:CountOfItemsForSale._sum.quantity,

 // Discount rate
  discountRate,

  SellThroughRate,

  CollectionRate,

PaymentMethodsCals

  }
}


}