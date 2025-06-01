import { Router } from "express";
import { createEmployee } from "../controllers/document.controller.js";

const documentRouter = Router();

documentRouter.post("/create", createEmployee);

export { documentRouter };
