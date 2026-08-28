import { Loan } from "../../../generated/prisma/client"
import {prisma} from "../../lib/prisma"


export const LoansService = {

GetLoans(params:{}){

        return prisma.loan.findMany()
},

CreateLoans(data:Loan){

    const {type, personName, phone, amount, amountPaid, dueDate, status, notes} = data

    return prisma.loan.create({
        data:{
            type,
            personName,
            phone,
            amount,
            amountPaid,
            dueDate,
            status,
            notes
        }
    })

},

GetLoansById(id:string){
return prisma.loan.findMany({
    where:{
        id
    }
})
},

UpdateLoan(data:Loan){

// Extract all loan details from Loan model

    return prisma.loan.update({

    })
    
}






}