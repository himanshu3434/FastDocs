import multer from "multer";
import { DocNameModel } from "../models/docname.model.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage });
export const singleUpload = multer({ storage }).single("photo1");

// export const getDynamicUploadMiddleware = async () => {
//   const docNames = await DocNameModel.find({});
//   const fields = docNames.map((doc) => ({
//     name: doc.Name,
//     maxCount: 1,
//   }));
//   console.log("Dynamic Upload Fields", fields);
//   return upload.fields(fields);
// };
