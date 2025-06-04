import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { loginUser, registerUser } from "../api/userApi";
import { login as storeLogin } from "../features/authSlice";
import { toastSuccess } from "../utils/toast";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const signup = async (data: FieldValues) => {
    setError("");
    try {
      const session = await registerUser(data);

      if (session.data.success) {
        const userLogin = await loginUser(data);
        toastSuccess("Account Created Successfully");
        if (userLogin.data.success) {
          const userData = userLogin.data.data.user;
          toastSuccess("Login Success");

          dispatch(storeLogin({ userData }));
        }

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="w-[350px] h-[450px]  rounded-xl p-5 mt-10   mb-10 ml-auto mr-auto text-black shadow-xl">
        <div className="text-3xl mb-4 text-center font-bold">
          <h1>Sign up </h1>
        </div>

        <div>
          {error && <div>Error Problem :{error}</div>}
          <form onSubmit={handleSubmit(signup)}>
            <div>
              <Input
                className="rounded-lg py-2 px-3 w-full text-black border border-gray-100"
                placeholder="Enter your Full Name"
                {...register("fullName", {
                  required: true,
                })}
              />

              <Input
                type="email"
                className="rounded-lg py-2 px-3 w-full mt-2 text-black border border-gray-100"
                placeholder="Enter your Email address"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              ></Input>
              <Input
                type="password"
                className="rounded-lg py-2 px-3 w-full mt-2 mb-2 text-black border border-gray-100"
                placeholder="Enter your Password "
                {...register("password", {
                  required: true,
                })}
              ></Input>

              <Select
                options={["Male", "Female", "Other"]}
                label="Gender"
                className=""
                {...register("gender", { required: true })}
              />
              <Input
                type="date"
                className="rounded-lg py-2 px-3 w-full mt-2 text-black border border-gray-100"
                placeholder="enter you Date"
                {...register("dob", {
                  required: true,
                })}
              ></Input>

              <Button
                type="submit"
                className="bg-sky-500 w-full py-2  mt-2 rounded-lg text-white "
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>

        <div
          className="flex justify-center  mt-5 
          "
        >
          <p>Already have a Account ? </p>
          <Link to="/login">
            <div className="pl-1 underline text-blue-400">Sign in</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
