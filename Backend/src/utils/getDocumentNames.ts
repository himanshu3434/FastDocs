import { DocNameModel } from "../models/docname.model.js";
import { asyncHandler } from "./asyncHandler.js";

const getDocumentName = async () => {
  let documents = [];
  try {
    documents = await DocNameModel.find({}).select("Name");
  } catch (error) {
    console.error("Error fetching document names:", error);
  }

  let uploadFieldsArray = documents.map((doc) => {
    return { name: doc.Name, maxCount: 1 };
  });

  return uploadFieldsArray;
};

export { getDocumentName };
