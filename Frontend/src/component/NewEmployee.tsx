import React from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import Select from "./Select";
import Button from "./Button";

function NewEmployee() {
  const { handleSubmit, register } = useForm({});

  const signup = async (data: any) => {};
  return (
    <div>
      <form onSubmit={handleSubmit(signup)}>
        <div>
          <Input
            label="Full Name"
            className="rounded-lg py-2 px-3 w-full border-2"
            placeholder="Enter your Full Name"
            {...register("fullName", {
              required: true,
            })}
          />

          <Input
            label="Mobile Number"
            type="tel"
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-2"
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
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-2"
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
            className="rounded-lg py-2 px-3 w-full mt-2 text-black border-2"
            placeholder="enter you Date"
            {...register("dob", {
              required: true,
            })}
          ></Input>

          <Input
            label="Address"
            className="rounded-lg py-2 px-3 w-full border-2"
            placeholder="Enter your House No ,Locality ,city"
            {...register("address", {
              required: true,
            })}
          />

          <Input
            label="State"
            type="text"
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-2"
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
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-2"
            placeholder="Enter your pincode "
            {...register("pincode", {
              required: true,
            })}
          ></Input>

          <Button
            type="submit"
            className="bg-sky-500 w-full py-2  mt-4 rounded-lg text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewEmployee;
