import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";

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
      from: '"Maddison Foo Koch" <arav.yadav3477@gmail.com>',
      to: "hy5411yo@gmail.com",
      subject: "Hello ✔",
      text: `dfafd ${cc1}, this is the second ${cc2}`, // plain‑text body
      html: "<b>Hello world?</b>", // HTML body
    });

    console.log("Message sent:", info.messageId);
  })();

  res
    .status(201)
    .json(
      new apiResponse(true, 200, newUser, "Employee Registered Successfully")
    );
});

export { createEmployee };
