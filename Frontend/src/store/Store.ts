import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";

export const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
