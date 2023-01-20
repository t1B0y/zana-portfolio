import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  loggedIn: false,
  loading: true,
};

export const fetchProjects = () => (dispatch) => {
  fetch(`http://localhost:3000/`)
    .then((res) => res.json())
    .then((data) => {
      dispatch(projectSlice.actions.getAllProjects(data));
    });
};

const projectSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    getAllProjects: (state, action) => {
      state.projects = action.payload;
    },
    editProject: (state, action) => {
      const { key, val, idx } = action.payload;
      state.projects[idx][key] = val;
    },
  },
});
export const { editProject, selectForUpload, addFile } = projectSlice.actions;
export default projectSlice.reducer;
