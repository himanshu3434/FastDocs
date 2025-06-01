import { Router } from "express";
import {
  createEmployee,
  getAllDocuments,
  uploadDocumentHandler,
} from "../controllers/document.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getDocumentName } from "../utils/getDocumentNames.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const documentRouter = Router();

documentRouter.post("/create", createEmployee);
documentRouter.post(
  "/upload",

  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "ssc", maxCount: 1 },
    { name: "hsc", maxCount: 1 },
    { name: "graduation", maxCount: 1 },
  ]),
  verifyJWT,
  uploadDocumentHandler
);
documentRouter.get(
  "/getAllDocuments/:id",
  verifyJWT,
  verifyAdmin,
  getAllDocuments
);

export { documentRouter };
