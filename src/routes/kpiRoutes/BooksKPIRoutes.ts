import { Router } from "express";
import GetBooksKPIController from "../../controller/BooksKPI";

export const BooksKPIRoutes = Router()

BooksKPIRoutes.get("/books-kpi", GetBooksKPIController)

