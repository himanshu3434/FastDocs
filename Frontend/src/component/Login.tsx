import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login as storeLogin } from "../features/authSlice";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

import Input from "./Input";
import Button from "./Button";
import { loginUser } from "../api/userApi";

import { toastError, toastSuccess } from "../utils/toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const login = async (data: FieldValues) => {
    setError("");

    try {
      const session = await loginUser(data);

      if (session.data.success) {
        const userData = session.data.data.user;
        dispatch(storeLogin({ userData }));

        toastSuccess("Login Success");

        navigate("/");
      } else {
        toastError("UserName or Password Incorrect");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="  w-[100vw] h-[100vh] -z-10 rounded-2xl opacity-55">
        {/* <img src="./logotest3.jpg" alt="" className=" " /> */}
      </div>
      <div className="absolute w-[350px] h-[400px] rounded-xl p-5 mt-10 mb-10  text-black shadow-2xl">
        <div className="text-3xl mb-4 text-center font-bold ">
          <h1 className="opacity-70">Sign in</h1>
        </div>
        <div>
          <div>
            {error && <div>Error Problem :{error}</div>}
            <form onSubmit={handleSubmit(login)}>
              <div>
                <Input
                  label="Email "
                  type="email"
                  className="rounded-lg py-2 px-3 w-full text-black border border-gray-100 "
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
                  label="Password "
                  type="password"
                  className="rounded-lg py-2 px-3 w-full text-black border border-gray-100"
                  placeholder="Enter your Password "
                  {...register("password", {
                    required: true,
                  })}
                ></Input>

                <Button
                  type="submit"
                  className="bg-sky-500 w-full mt-5 py-2 rounded-lg text-white"
                >
                  Log In
                </Button>
              </div>
            </form>
          </div>

          <div
            className="flex justify-center  mt-5 pt-5
          "
          >
            <p>Don't have a Account ? </p>
            <Link to="/signup">
              <div className="pl-1 underline text-blue-600">Sign Up</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
