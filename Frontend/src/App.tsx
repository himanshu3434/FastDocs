import { lazy, useEffect, useState } from "react";
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

import NewEmployee from "./component/NewEmployee";
import AllEmployee from "./component/AllEmployee";
import EmployeeUpload from "./component/EmployeeUpload";
import EmployeeDetail from "./component/EmployeeDetail";
import ThankYou from "./component/ThankYou";
import GenericLoader from "./component/GenericLoader";

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
      .finally(() => {
        setLoading(false);

        // console.log("  User Status : ", userStatus);
      });
  }, []);
  return (
    <div className="">
      <Header />
      {loading ? (
        <GenericLoader />
      ) : (
        <div className="bg-hero-gradient">
          <div>
            <Routes>
              {userData && userData.role === "admin" ? (
                <Route
                  path="/"
                  element={
                    <AuthLayout
                      authentication
                      userStatus={userStatus}
                      isAdmin={userData?.role === "admin" ? true : false}
                      adminOnly={false}
                    >
                      <AllEmployee />
                    </AuthLayout>
                  }
                />
              ) : (
                <Route
                  path="/"
                  element={
                    <AuthLayout
                      authentication
                      userStatus={userStatus}
                      isAdmin={userData?.role === "admin" ? true : false}
                      adminOnly={false}
                    >
                      <EmployeeUpload />
                    </AuthLayout>
                  }
                />
              )}
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
              <Route path="/done" element={<ThankYou />} />
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
                  <AuthLayout
                    authentication={true}
                    userStatus={userStatus}
                    isAdmin={userData?.role === "admin"}
                    adminOnly={true}
                  >
                    <NewEmployee />
                  </AuthLayout>
                }
              />
              <Route
                path="/all"
                element={
                  <AuthLayout
                    authentication={true}
                    userStatus={userStatus}
                    isAdmin={userData?.role === "admin"}
                    adminOnly={true}
                  >
                    <AllEmployee />
                  </AuthLayout>
                }
              />
              <Route
                path="/employee/:id"
                element={
                  <AuthLayout
                    authentication={true}
                    userStatus={userStatus}
                    isAdmin={userData?.role === "admin"}
                    adminOnly={true}
                  >
                    <EmployeeDetail />
                  </AuthLayout>
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
