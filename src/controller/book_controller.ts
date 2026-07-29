import { Request, Response } from "express";
import { BookModels } from "../services/BookCatalogs/bookModel";
import { BooksServices } from "../services/BookCatalogs/BookServices";
import ResponseWork from "../utilityResponse/Response";


const bookModel = BookModels.books;
const reservationModel = BookModels.reservations;
const inventoryModel = BookModels.inventory


export const BookController = {


async getAllBooks(req:Request, res:Response){

    try {

        const BooksData = await BooksServices.getAll(bookModel)


        ResponseWork.SuccessResponse(
            201,
            "Books Fetched Successfully",
            BooksData,
            res
        )


    } catch(error){

        console.log(error)

        ResponseWork.FailureResponse(
            500,
            "There was an error fetching books",
            res
        )

    }

},





async CreateBooks(req:Request, res:Response){

    try {

        const incomingData = req.body

        const BooksData = await BooksServices.create(
            bookModel,
            incomingData
        )


        ResponseWork.SuccessResponse(
            201,
            "Books Added Successfully",
            BooksData,
            res
        )


    } catch(error){

        console.log(error)

        ResponseWork.FailureResponse(
            500,
            "There was an error Adding books",
            res
        )

    }

},





// =========================
// RESERVATIONS
// =========================


async getAllReservations(req:Request, res:Response){

    try {


        const ReservationData =
        await BooksServices.getReservations(
            reservationModel
        )



        ResponseWork.SuccessResponse(
            201,
            "Reservations Fetched Successfully",
            ReservationData,
            res
        )


    } catch(error){

        console.log(error)


        ResponseWork.FailureResponse(
            500,
            "There was an error fetching reservations",
            res
        )

    }

},






async CreateReservation(req:Request, res:Response){

    try {


        const incomingData = req.body


       const ReservationData =
await BooksServices.Create_reservation(
    BookModels.prisma,
    incomingData
)


        ResponseWork.SuccessResponse(
            201,
            "Reservation Created Successfully",
            ReservationData,
            res
        )


    } catch(error:any){

    console.log(error)


    ResponseWork.FailureResponse(
        400,
        error.message || "There was an error creating reservation",
        res
    )

}

},

  async updateReservationStatus(req:Request, res:Response){
    try {

const incomingData = req.body

const ReservedStatusUpdate = await BooksServices.UpdateReservationStatus(
    BookModels.prisma,
    incomingData
)

return ResponseWork.SuccessResponse(
    201,
    "Reservation Updated",
    ReservedStatusUpdate,
    res
)


    } catch (error){
        console.log(error)
    }
  },






async DeleteReservation(req:Request, res:Response){

    try {


        const {id} = req.params


        const ReservationData =
        await BooksServices.delete(
            reservationModel,
            id as string
        )



        ResponseWork.SuccessResponse(
            200,
            "Reservation Deleted Successfully",
            ReservationData,
            res
        )


    } catch(error){

        console.log(error)



        ResponseWork.FailureResponse(
            500,
            "There was an error deleting reservation",
            res
        )

    }

}



}