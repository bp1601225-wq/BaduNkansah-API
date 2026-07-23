import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/testRoute";
import MasterRouter from "./routes/MasterRoutes";


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(router)
app.use(MasterRouter)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


export default app;