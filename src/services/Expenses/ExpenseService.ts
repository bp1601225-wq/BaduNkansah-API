import {prisma} from "../../lib/prisma"


export const ExpenseServices = {


    getAllExpense(){

        return prisma.expense.findMany({
            select:{
                id:true,
                expenseName:true,
                amount:true,
                expenseDate:true,
                expenseCategoryId:true,
                description:true,
                createdAt:true,

                        category:{
                            select:{
                              categoryName:true
                            }
                        }

            }
        })
    },


createExpense(data: any) {
  return prisma.expense.create({
    data: {
      ...data,
      expenseDate: new Date(data.expenseDate),
    },
  });
},


    getExpenseById(id:string){
        return prisma.expense.findUnique({
            where:{
                id
            }, 
                 select:{
                id:true,
                expenseName:true,
                amount:true,
                expenseDate:true,
                expenseCategoryId:true,
                description:true,
                createdAt:true,
            }
        })
    },

UpdateExpense(data: any) {
  console.log("SERVICE DATA:", data);

  const {
    id,
    expenseName,
    amount,
    expenseCategoryId,
    expenseDate,
    description,
  } = data;

  console.log({
    id,
    expenseName,
    amount,
    expenseCategoryId,
    expenseDate,
    description,
  });

  return prisma.expense.update({
    where: { id },
    data: {
      expenseName,
      amount: Number(amount),
      expenseCategoryId,  
      expenseDate: new Date(expenseDate),
      description,
    },
  });
}

}