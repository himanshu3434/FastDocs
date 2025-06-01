import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import { CustomRequest, filesMulter } from "../types/types.js";
import { fileUploadHandler } from "../utils/fileUpload.js";
import { UserDocumentModel } from "../models/document.model.js";
import fs from "fs";
const createEmployee = asyncHandler(async (req: Request, res: Response) => {
  const {
    email,
    mobileNumber,
    address,
    pincode,
    country,
    state,
    dob,
    fullName,
    gender,
  } = req.body;

  if (
    [
      email,
      mobileNumber,
      address,
      pincode,
      country,
      state,
      dob,
      fullName,
      gender,
    ].some((field) => field?.trim() === "") ||
    !dob
  ) {
    return res
      .status(404)
      .json(new apiResponse(false, 404, null, "All Fields Are Required"));
  }

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser)
    return res
      .status(409)
      .json(
        new apiResponse(
          false,
          409,
          null,
          "Employee with This email Already exist"
        )
      );
  const password = fullName.split(" ")[0].toLowerCase() + "_demo";
  const user = await User.create({
    email,
    mobileNumber,
    address,
    pincode,
    country,
    state,
    dob,
    fullName,
    gender,
    password,
  });

  const newUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!newUser)
    return res
      .status(500)
      .json(
        new apiResponse(
          false,
          500,
          null,
          "Internal Server Error While Registering the Employee "
        )
      );

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE_HOST,
    port: Number(process.env.EMAIL_SERVICE_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASSWORD,
    },
  });
  const cc1 = "kuch bhi name ";
  const cc2 = "second hai ";
  // Wrap in an async IIFE so we can use await.
  (async () => {
    const info = await transporter.sendMail({
      from: '"James Bond" <arav.yadav3477@gmail.com>',
      to: email,
      subject: "Welcome to Our Platform - Login Details",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">
      <h2>Welcome, ${fullName}!</h2>
      <p>You've been successfully registered on our platform. To get started, please log in using the following credentials:</p>
      <p>
        <strong>Login Link:</strong> <a href="${process.env.CORS_ORIGIN}">Website</a><br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Password:</strong> ${password}
      </p>
      <p>After logging in, please upload your necessary documents.</p>
      <hr/>
      <p>If you have any issues logging in, feel free to contact our support team.</p>
      <p>Best Regards,<br/>The Admin Team</p>
    </div>
  `,
    });

    console.log("Message sent:", info.messageId);
  })();

  res
    .status(201)
    .json(
      new apiResponse(true, 200, newUser, "Employee Registered Successfully")
    );
});

const uploadDocumentHandler = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const files = req.files as filesMulter;

    const documentFields = [
      "aadharCard",
      "panCard",
      "ssc",
      "hsc",
      "graduation",
    ] as const;

    let documentImageList = {
      aadharCard: "",
      panCard: "",
      ssc: "",
      hsc: "",
      graduation: "",
    };

    for (const field of documentFields) {
      if (files && Array.isArray(files[field]) && files[field].length > 0) {
        const localFilePath = files[field][0]?.path;
        if (localFilePath) {
          const uploadedUrl = await fileUploadHandler(localFilePath);

          if (!uploadedUrl) {
            return res
              .status(500)
              .json(
                new apiResponse(
                  false,
                  500,
                  null,
                  `Internal Server Error while Uploading the ${field} document to Cloud`
                )
              );
          }

          documentImageList[field] = uploadedUrl?.url || "";
        }
      }
    }
    const userID = req.user?._id;

    const newEmployeeDocuments = await UserDocumentModel.create({
      userId: userID,
      aadharCard: documentImageList.aadharCard,
      panCard: documentImageList.panCard,
      ssc: documentImageList.ssc,
      hsc: documentImageList.hsc,
      graduation: documentImageList.graduation,
    });

    for (const field of documentFields) {
      const localFilePath = files?.[field]?.[0]?.path;
      if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    }
    console.log("Documents Uploaded Successfully", newEmployeeDocuments);

    res
      .status(200)
      .json(
        new apiResponse(
          true,
          200,
          newEmployeeDocuments,
          "Documents Uploaded Successfully"
        )
      );
  }
);

const getAllDocuments = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const documents = await UserDocumentModel.findOne({ userId: userId });

  if (!documents) {
    return res
      .status(200)
      .json(new apiResponse(true, 200, { flag: false }, "No Documents Found"));
  }
  return res
    .status(200)
    .json(
      new apiResponse(
        true,
        200,
        { flag: true, documents },
        "No Documents Found"
      )
    );
});

export { createEmployee, uploadDocumentHandler, getAllDocuments };
