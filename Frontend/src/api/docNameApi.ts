import axios from "axios";
import type { FieldValues } from "react-hook-form";

const getAllDocName = async () => {
  const getAllDocNameUrl = `${import.meta.env.VITE_SERVER_URL}/docName/all`;
  const createOptions = {
    method: "GET",
    url: getAllDocNameUrl,
  };

  const allDocNames = await axios.request(createOptions);

  return allDocNames;
};
const createEmployee = async (data: FieldValues) => {
  const createEmployeeUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/document/create`;
  const createOptions = {
    method: "POST",
    url: createEmployeeUrl,

    data: {
      ...data,
    },
  };

  const newEmployee = await axios.request(createOptions);

  return newEmployee;
};

const uploadAllDocuments = async (data: FieldValues) => {
  const uploadAllDocumentsnUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/document/upload`;
  const createOptions = {
    method: "POST",
    url: uploadAllDocumentsnUrl,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };

  console.log("Data being send : ", data);

  const documentUploadStatus = await axios.request(createOptions);

  return documentUploadStatus;
};

const getAllDocument = async (id: string) => {
  const getAllDocumentUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/document/getAllDocuments/${id}`;
  const createOptions = {
    method: "GET",
    url: getAllDocumentUrl,
  };

  const allDocumentsPhoto = await axios.request(createOptions);

  return allDocumentsPhoto;
};

export { getAllDocName, uploadAllDocuments, getAllDocument, createEmployee };
