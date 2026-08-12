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
import RolesRouter from "./routes/roleRoutes";
import EmployeeRouter from "./routes/EmployeeRoutes";
import ExpenseRoutes from "./routes/ExpenseRoutes";
import { PurchaseRouter } from "./routes/PurchaseRoutes";
import { DashboardRouter } from "./routes/kpiRoutes/DashboardRoutes";
import { AssetRoutes } from "./routes/AssetRoutes";
import { AssetKpiRoutes } from "./routes/kpiRoutes/AssetKpiRoutes";
import { AuthRoutes } from "./routes/AuthenticationRoute";
import { UsersRouter } from "./routes/UserRoutes";

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
app.use(RolesRouter)
app.use(EmployeeRouter)
app.use(ExpenseRoutes)
app.use(PurchaseRouter)
app.use(DashboardRouter)
app.use(AssetRoutes)
app.use(AssetKpiRoutes)
app.use(AuthRoutes)
app.use(UsersRouter)

export default app;