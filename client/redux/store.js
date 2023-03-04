import { configureStore } from '@reduxjs/toolkit';
import projects from './projectsSlice.js';
import form from './formSlice';

export const store = configureStore({
  reducer: {
    form,
    projects,
  },
});
