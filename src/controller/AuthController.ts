import { Request, Response } from "express";
import ResponseWork from "../utilityResponse/Response";
import { AuthenticationService } from "../services/Authentication/AuthServices";

export const AuthenticationController = {

    async LoginController(req:Request, res:Response){
try{

    const incomingData = req.body
    const finalData = await AuthenticationService.LoginService(incomingData)

    ResponseWork.SuccessResponse(201,
        "Welcome back",
        finalData,
        res
    )

} catch (error:any){

console.log(error)

    ResponseWork.FailureResponse(500,
        error.message,
        res
    )
}

    },

    async Logout(req:Request, res:Response){
try {

} catch {

}
    }

}