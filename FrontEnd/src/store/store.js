import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../hooks/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
