import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./reducer";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
  },
});
