import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { DocNameModel } from "../models/docname.model.js";
import { getTokenSourceMapRange } from "typescript";

const createDocName = asyncHandler(async (req: Request, res: Response) => {
  const { docName } = req.body;
  if (!docName) {
    return res
      .status(400)
      .json(new apiResponse(false, 404, null, "All Fields Are Required"));
  }

  const statusDocName = await DocNameModel.find({ Name: docName });
  if (statusDocName.length > 0) {
    return res
      .status(400)
      .json(new apiResponse(false, 400, null, "Document Name Already Exist"));
  }

  const newDocName = await DocNameModel.create({ Name: docName });
  return res
    .status(200)
    .json(
      new apiResponse(
        true,
        200,
        newDocName,
        "Document Name Created Successfully"
      )
    );
});

const getAllDocNames = asyncHandler(async (req: Request, res: Response) => {
  const docName = await DocNameModel.find({});

  return res
    .status(200)
    .json(
      new apiResponse(
        true,
        200,
        docName,
        "All Document Names Fetched Successfully"
      )
    );
});

export { createDocName, getAllDocNames };
