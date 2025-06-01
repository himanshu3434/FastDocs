import React from "react";
import Input from "./Input";

function EmployeeUpload() {
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[40vw] mx-auto shadow-lg p-5 rounded-2xl"
        encType="multipart/form-data"
      >
        <div className="font-semibold text-center   opacity-45  ">
          Create Product{" "}
        </div>

        <div className=" space-y-5 mt-5">
          <Input
            label="AadharCard:"
            type="file"
            className=" bg-gray-200 flex "
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("aadharCard", { required: true })}
          />
          <Input
            label="PanCard :"
            type="file"
            className=" bg-gray-200 flex"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("panCard", { required: true })}
          />
          <Input
            label="10th Marksheet :"
            type="file"
            className=" bg-gray-200 flex"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("ssc", { required: true })}
          />
          <Input
            label="12th Marksheet :"
            type="file"
            className=" bg-gray-200 flex "
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("hsc", { required: true })}
          />

          <Button
            type="submit"
            className="w-full mt-2  bg-sky-500 rounded-lg py-2 text-white hover:bg-sky-400"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeUpload;
