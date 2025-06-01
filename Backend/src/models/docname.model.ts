import mongoose, { Schema } from "mongoose";

const DocumentName = new Schema(
  {
    Name: {
      type: String,
      trim: true,
      required: [true, "Document Name is Required"],
    },
  },
  { timestamps: true }
);

export const DocNameModel = mongoose.model("DocName", DocumentName);
