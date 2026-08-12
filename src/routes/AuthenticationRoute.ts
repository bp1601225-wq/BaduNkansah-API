import { Router } from "express";
import { AuthenticationController } from "../controller/AuthController";

export const AuthRoutes = Router()

AuthRoutes.post("/auth", AuthenticationController.LoginController)