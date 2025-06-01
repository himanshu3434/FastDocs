import { Router } from "express";
import { userRouter } from "./user.routes.js";
import {
  createDocName,
  getAllDocNames,
} from "../controllers/docName.controller.js";

const docNameRouter = Router();

docNameRouter.post("/create", createDocName);
docNameRouter.get("/all", getAllDocNames); // Nested user routes under docName

export { docNameRouter };
