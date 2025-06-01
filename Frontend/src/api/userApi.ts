import axios from "axios";
import type { FieldValues } from "react-hook-form";
const loginUser = async (data: FieldValues) => {
  const loginUrl = `${import.meta.env.VITE_SERVER_URL}/user/login`;
  const createOptions = {
    method: "POST",
    url: loginUrl,

    data: {
      ...data,
    },
  };

  const session = await axios.request(createOptions);

  return session;
};

const registerUser = async (data: FieldValues) => {
  const loginUrl = `${import.meta.env.VITE_SERVER_URL}/user/registerUser`;
  const createOptions = {
    method: "POST",
    url: loginUrl,

    data: {
      ...data,
    },
  };

  const session = await axios.request(createOptions);

  return session;
};

const getCurrentUser = async () => {
  axios.defaults.withCredentials = true;
  const getCurrentUserUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/user/getCurrentUser`;
  const options = {
    method: "GET",
    url: getCurrentUserUrl,
    withCredentials: true,
  };

  const session = await axios.request(options);

  return session;
};

const logoutUserApi = async () => {
  const logoutUserUrl = `${import.meta.env.VITE_SERVER_URL}/user/logout`;
  const options = {
    method: "POST",
    url: logoutUserUrl,
  };

  const logoutUserResponse = await axios.request(options);

  return logoutUserResponse;
};

const updateProfile = async (data: FieldValues) => {
  const updateProfileUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/user/updateDetails`;
  const createOptions = {
    method: "POST",
    url: updateProfileUrl,

    data: {
      ...data,
    },
  };

  const updateResponse = await axios.request(createOptions);

  return updateResponse;
};
const fetchAllUsers = async () => {
  const getAllUsersUrl = `${import.meta.env.VITE_SERVER_URL}/user/allUser`;
  const options = {
    method: "GET",
    url: getAllUsersUrl,
  };

  const allUsers = await axios.request(options);

  return allUsers;
};
const getSpecificUser = async (id: string) => {
  const getAllUsersUrl = `${import.meta.env.VITE_SERVER_URL}/user/get/${id}`;
  const options = {
    method: "GET",
    url: getAllUsersUrl,
  };

  const currentUsers = await axios.request(options);

  return currentUsers;
};

export {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUserApi,
  updateProfile,
  fetchAllUsers,
  getSpecificUser,
};
