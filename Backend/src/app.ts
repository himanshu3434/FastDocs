import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
//necessary middlewares
app.use(cookieParser());
console.log("  this is cors origin ", process.env.CORS_ORIGIN);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["POST", "GET", "PUT", "DELETE"],

    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

console.log(process.env.PORT);

import { userRouter } from "./routes/user.routes.js";
import { docNameRouter } from "./routes/docName.routes.js";
import { documentRouter } from "./routes/document.routes.js";

app.use("/api/v1/test", async (req: Request, res: Response) => {
  res.send("Welcome to EasyDocs Api");

  return;
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/docName", docNameRouter);
app.use("/api/v1/document", documentRouter);

setInterval(async () => {
  // console.log(" calling ping ");
  try {
    const response = await fetch(process.env.PING_URL || "");
    const data = await response.text();
    console.log("response  ", data);
  } catch (e) {
    console.log("error in ping ", e);
  }
}, 840000);
export { app };
