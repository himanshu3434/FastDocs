import Input from "./Input";
import { useForm } from "react-hook-form";
import Select from "./Select";
import Button from "./Button";

import { toastError, toastSuccess } from "../utils/toast";
import { createEmployee } from "../api/docNameApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NewEmployee() {
  const { handleSubmit, register } = useForm({});
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonText, setButtonText] = useState(0);
  const buttonTextArray = ["Create", "Sending..", "Parsing...", "Creating.."];

  const signup = async (data: any) => {
    setButtonLoading(true);
    setButtonText(1);
    const NewEmployeesDetails = await createEmployee(data);

    console.log("New Employee Details : ", NewEmployeesDetails);
    if (NewEmployeesDetails.data.success) {
      toastSuccess("New Employee Added Successfully");
      console.log("New Employee Details indifr  : ", NewEmployeesDetails);
      navigate("/all");
    } else {
      if (NewEmployeesDetails.data.statusCode === 409)
        toastError("Employee with This Email Already Exist");
      else toastError("Something went wrong while adding new employee");
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

  return (
    <div className=" w-2/3 mx-auto shadow-2xl p-6 rounded-4xl bg-white">
      <div className="flex justify-center items-center my-4">
        <h1 className="font-bold text-3xl">Employee Details</h1>
      </div>
      <form onSubmit={handleSubmit(signup)}>
        <div className=" mx-auto">
          <Input
            label="Full Name"
            className="rounded-lg py-2 px-3 w-full border-1 border-slate-300"
            placeholder="Enter your Full Name"
            {...register("fullName", {
              required: true,
            })}
          />

          <Input
            label="Mobile Number"
            type="tel"
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-1 border-slate-300"
            placeholder="Enter your Number "
            {...register("mobileNumber", {
              validate: {
                matchPatern: (value) =>
                  /^[789]\d{9}$/.test(value as string) ||
                  "Mobile number must be a valid number",
              },
            })}
          ></Input>

          <Input
            label="Email Address"
            type="email"
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-1 border-slate-300"
            placeholder="Enter your Email address"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          ></Input>

          <Select
            options={["Male", "Female", "Other"]}
            label="Gender"
            className=" "
            {...register("gender", { required: true })}
          />
          <Input
            label="Date of Birth"
            type="date"
            className="rounded-lg py-2 px-3 w-full mt-2 text-black border-1 border-slate-300"
            placeholder="enter you Date"
            {...register("dob", {
              required: true,
            })}
          ></Input>

          <Input
            label="Address"
            className="rounded-lg py-2 px-3 w-full border-1 border-slate-300"
            placeholder="Enter your House No ,Locality ,city"
            {...register("address", {
              required: true,
            })}
          />

          <Input
            label="State"
            type="text"
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-1 border-slate-300"
            placeholder="Enter your State "
            {...register("state", {
              required: true,
            })}
          ></Input>

          <Select
            options={["india"]}
            label="Country"
            className=" "
            {...register("country", { required: true })}
          />
          <Input
            label="Pincode"
            type="Number"
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-1 border-slate-300"
            placeholder="Enter your pincode "
            {...register("pincode", {
              required: true,
            })}
          ></Input>

          <Button
            type="submit"
            className="bg-sky-500 w-full py-2  mt-4 rounded-lg text-white cursor-pointer"
          >
            {buttonTextArray[buttonText]}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewEmployee;
