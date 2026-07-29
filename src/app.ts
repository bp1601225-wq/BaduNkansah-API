import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/testRoute";
import MasterRouter from "./routes/MasterRoutes";
import CategoryRouter from "./routes/categoryRoutes";
import { BooksRouter } from "./routes/BookRoutes";
import { CustomerRouter } from "./routes/customerRoutes";
import { InventoryRouter } from "./routes/inventoryRoutes";

const app = express();

// Parse request body first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security & logging
app.use(helmet());
app.use(morgan("dev"));

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173"], // Your React/Vite app
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use(router);
app.use(MasterRouter);
app.use(CategoryRouter)
app.use(BooksRouter)
app.use(CustomerRouter)
app.use(InventoryRouter)

export default app;