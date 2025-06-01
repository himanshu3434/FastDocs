import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

const Header = lazy(() => import("./component/header"));

const Login = lazy(() => import("./component/Login"));
const Signup = lazy(() => import("./component/Signup"));

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./api/userApi";
import AuthLayout from "./component/AuthLayout";
import { login, logout } from "./features/authSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { RootState } from "./store/Store";
import type { Iuser } from "./types/types";
import axios from "axios";
import GenericLoader from "./component/GenericLoader";
import NewEmployee from "./component/NewEmployee";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const userStatus = useSelector((state: RootState) => state.auth.status) as
    | boolean
    | false;
  const userData = useSelector(
    (state: RootState) => state.auth.userData
  ) as Iuser | null;

  useEffect(() => {
    axios.defaults.withCredentials = true;
    getCurrentUser()
      .then((user) => {
        if (user.data.success) {
          const userData = user.data.data.user;

          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="">
      <Header />
      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <div>
          <div>
            <Routes>
              <Route
                path="/login"
                element={
                  <AuthLayout
                    authentication={false}
                    userStatus={userStatus}
                    isAdmin={userData?.role === "admin" ? true : false}
                    adminOnly={false}
                  >
                    <Login />
                  </AuthLayout>
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthLayout
                    authentication={false}
                    userStatus={userStatus}
                    isAdmin={userData?.role === "admin" ? true : false}
                    adminOnly={false}
                  >
                    <Signup />
                  </AuthLayout>
                }
              />
              <Route
                path="/newEmployee"
                element={
                  // <AuthLayout
                  //   authentication={true}
                  //   userStatus={userStatus}
                  //   isAdmin={userData?.role === "admin"}
                  //   adminOnly={true}
                  // >
                  <NewEmployee />
                  // </AuthLayout>
                }
              />
            </Routes>
          </div>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      )}
    </div>
  );
}

export default App;
