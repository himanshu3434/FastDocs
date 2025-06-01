import mongoose, { Schema } from "mongoose";

const UserDocument = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    aadharCard: {
      type: String,
      required: true,
    },
    panCard: {
      type: String,
      required: true,
    },
    ssc: {
      type: String,
      required: true,
    },
    hsc: {
      type: String,
      required: true,
    },
    graduation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserDocumentModel = mongoose.model(
  "UserDocumentMod",
  UserDocument
);
