import { useEffect, useState } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { getAllDocName, uploadAllDocuments } from "../api/docNameApi";
import { toastError, toastSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import GenericLoader from "./GenericLoader";

function EmployeeUpload() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonText, setButtonText] = useState(0);
  const buttonTextArray = ["Upload", "Sending..", "Parsing...", "uploading.."];

  const onSubmit = async (data: any) => {
    data.aadharCard = data.aadharCard[0];
    data.panCard = data.panCard[0];
    data.ssc = data.ssc[0];
    data.hsc = data.hsc[0];
    data.graduation = data.graduation[0];
    setButtonLoading(true);
    setButtonText(1);

    const uploadDocumentStatuis = await uploadAllDocuments(data);

    if (uploadDocumentStatuis.data.success) {
      toastSuccess("Documents Uploaded Successfully");
      navigate("/done");
    }
    setButtonLoading(false);
  };

  useEffect(() => {
    const changeText = setInterval(() => {
      if (buttonLoading) {
        setButtonText((prev) => (prev === 3 ? prev : prev + 1));
      }
    }, 1200);
    if (!buttonLoading) {
      setButtonText(0);
    }

    return () => {
      clearInterval(changeText);
    };
  }, [buttonLoading]);

  const [allDocNames, setAllDocNames] = useState([]);
  const [loading, SetLoading] = useState(true);
  const docNameHandler = async () => {
    const docNames = await getAllDocName();
    if (docNames.data.success) {
      setAllDocNames(docNames.data.data);
    } else {
      toastError("Something went wrong while fetching document names");
    }
  };
  useEffect(() => {
    docNameHandler().then(() => {
      SetLoading(false);
    });
  }, []);

  return loading ? (
    <div>
      <GenericLoader />{" "}
    </div>
  ) : (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[40vw] mx-auto shadow-lg p-5 rounded-2xl flex flex-col items-center bg-white"
        encType="multipart/form-data"
      >
        <div className="font-bold text-center  text-2xl   opacity-70 ">
          Document Upload{" "}
        </div>

        <div className=" space-y-5 mt-5 ">
          {allDocNames.map((docName: any) => (
            <Input
              key={docName._id}
              label={`*${docName.Name}:`}
              type="file"
              className="  bg-gray-200 flex cursor-pointer rounded-xl p-2"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register(docName.Name, { required: true })}
            />
          ))}

          <Button
            type="submit"
            className="w-full mt-2  bg-sky-500 rounded-lg py-2 text-white hover:bg-sky-400"
          >
            {buttonTextArray[buttonText]}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeUpload;
