import { configureStore } from "@reduxjs/toolkit";
import projects from "./reducer";
import upload from "./uploadReducer";

export const store = configureStore({
  reducer: {
    upload,
    projects,
  },
});
