import { Router } from "express";
import { BookController } from "../controller/book_controller";

export const BooksRouter = Router();


// Books
BooksRouter.get(
  "/books",
  BookController.getAllBooks
);

BooksRouter.post(
  "/books",
  BookController.CreateBooks
);


BooksRouter.put("/books/:id", BookController.UpdateBooksController)


// Book Reservations
BooksRouter.get(
  "/reservations",
  BookController.getAllReservations
);

BooksRouter.post(
  "/reservations",
  BookController.CreateReservation
);

BooksRouter.delete(
  "/reservations/:id",
  BookController.DeleteReservation
);

BooksRouter.patch("/reservations", BookController.updateReservationStatus)