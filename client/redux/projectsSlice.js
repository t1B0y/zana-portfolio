import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allProjects: [],
  loggedIn: false,
  loading: true,
  currentProject: '',
  currentImage: '',
  images: {
    frontImage: 'https://portfolio-m.s3.amazonaws.com/default.png',
    image1: 'https://portfolio-m.s3.amazonaws.com/default.png',
    image2: 'https://portfolio-m.s3.amazonaws.com/default.png',
    image3: 'https://portfolio-m.s3.amazonaws.com/default.png',
    image4: 'https://portfolio-m.s3.amazonaws.com/default.png',
  },
};

export const selectProject = (projectTitle) => (dispatch) => {
  console.log(projectTitle);
  axios
    .get(`http://localhost:3000/image/${projectTitle}`)
    .then((res) => res.data)
    .then((data) => {
      console.log({
        images: data,
        name: projectTitle,
      });
      dispatch(
        projectsSlice.actions.setCurrentProject({
          images: data,
          name: projectTitle,
        })
      );
    });
};

export const fetchProjects = () => (dispatch) => {
  axios
    .get(`http://localhost:3000/project`)
    .then((res) => res.data)
    .then((data) => {
      dispatch(projectsSlice.actions.getAllProjects(data));
    });
};

export const getProject = (projectTitle) => (dispatch) => {
  axios
    .get(`http://localhost:3000/project/${projectTitle}`)
    .then((res) => res.data)
    .then((data) => {
      dispatch(projectsSlice.actions.setCurrentProject(data));
    });
};

export const reorderDataBase = (oldPos, newPos, id) => (dispatch) => {
  axios
    .post(`http://localhost:3000/project/reorder`, { oldPos, newPos, id })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
    });
};

export const deleteProject = (id, projectName) => (dispatch) => {
  axios
    .delete(`http://localhost:3000/project/${id}`, { data: { projectName } })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
    });
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {
    getAllProjects: (state, action) => {
      state.allProjects = action.payload;
    },
    reorder: (state, action) => {
      const [oldPos, newPos] = action.payload;
      const el = state.allProjects.splice(oldPos, 1);
      state.allProjects.splice(newPos, 0, el[0]);
    },
    editProject: (state, action) => {
      const { key, val, idx } = action.payload;
      state.projects[idx][key] = val;
    },
    selectImage: (state, action) => {
      state.currentImage = state.images[action.payload];
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload.name;
      const newImages = {};
      for (let fileName of action.payload.images) {
        const url = 'https://portfolio-m.s3.amazonaws.com/' + fileName;
        const key = fileName.split('_')[1].split('.')[0];
        state.images[key] = url;
      }
    },
  },
});
export const {
  editProject,
  selectForUpload,
  addFile,
  setCurrentProject,
  getAllProjects,
  selectImage,
  reorder,
} = projectsSlice.actions;
export default projectsSlice.reducer;
