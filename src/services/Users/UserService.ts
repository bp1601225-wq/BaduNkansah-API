import {prisma} from "../../lib/prisma"
import argon2 from "argon2"

export const UserService = {

    GetAllUser(){
        return prisma.user.findMany({
            select:{
                id:true,
                userName:true,
                email:true,
                contact:true,
                address:true,

                //  only if user is an employee
                employee:{
                    select:{
                       salary:true,
                       role:true,
                       status:true,
                       hireDate:true
                    }
                }
                
            }
        })
    },

   GetUserById(userId:string){
return prisma.user.findUnique({
    where:{
        id:userId
    },   select:{
                id:true,
                userName:true,
                email:true,
                contact:true,
                address:true,

                //  only if user is an employee
                employee:{
                    select:{
                       salary:true,
                       role:true,
                       status:true,
                       hireDate:true
                    }
                }
                
            }
})
    },


  async  CreateUser(data: any) {
  const {
    userName,
    email,
    password,
    contact,
    adress,
    status,
    // employeeId,
  } = data;

  const HashedArgon = await argon2.hash(password)

  return prisma.user.create({
    data: {
      userName,
      email,
      password:HashedArgon,
      contact,
      adress,
      status,
    //   employeeId,
    },
  });
}, 

   UpdateUser(id: string, data: any) {
  const {
    userName,
    email,
    password,
    contaact,
    adress,
    status,
    employeeId,
  } = data;

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      userName,
      email,
      password,
      contaact,
      adress,
      status,
      employeeId,
    },
  });
},

    DeleteUser(UserId:string){
        return prisma.user.delete({
            where:{
                id:UserId
            }
        })
    }

 

}