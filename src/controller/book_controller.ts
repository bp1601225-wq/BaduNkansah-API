import { Request, Response } from "express";
import { BookModels } from "../services/BookCatalogs/bookModel";
import { BooksServices } from "../services/BookCatalogs/BookServices";
import ResponseWork from "../utilityResponse/Response";


const bookModel = BookModels.books;
const reservationModel = BookModels.reservations;
const prisma = BookModels.prisma


export const BookController = {


async getAllBooks(req: Request, res: Response) {
  try {
    const quantity = req.query.quantity
      ? Number(req.query.quantity)
      : undefined;

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : undefined;

    console.log("quantity:", quantity);
    console.log("search:", search);

    const BooksData = await BooksServices.getAll(
      bookModel,
      quantity,
      search
    );

    ResponseWork.SuccessResponse(
      201,
      "Books Fetched Successfully",
      BooksData,
      res
    );
  } catch (error) {
    console.log(error);

    ResponseWork.FailureResponse(
      500,
      "There was an error fetching books",
      res
    );
  }
},




async CreateBooks(req:Request, res:Response){

    try {

        const incomingData = req.body

        console.log(`Data is`, incomingData)

        const BooksData = await BooksServices.create(
            prisma,
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


async UpdateBooksController(req:Request, res:Response){
    try {


const data = req.body
// const id = req.params.id

console.log(`incoming data is`, data)

const incomingData = await BooksServices.
updateBooksService(bookModel, {
      id: req.params.id,
      ... data
    })

ResponseWork.SuccessResponse(201, 
    "Book data updated Succesfully",
    incomingData,
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