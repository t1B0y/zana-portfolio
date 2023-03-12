import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allProjects: [],
  loggedIn: false,
  loading: true,
  currentProject: '',
  currentImage: '',
};

export const fetchProjects = () => (dispatch) => {
  axios
    .get(`http://localhost:3000/project`)
    .then((res) => res.data)
    .then((data) => {
      dispatch(projectsSlice.actions.getAllProjects(data));
    });
};

export const uploadImage =
  ({ imageName, projectTitle, id }) =>
  (dispatch, getState) => {
    axios
      .get(`http://localhost:3000/image/${projectTitle}`, { imageName, id })
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
      action.payload = action.payload.map((p) => {
        p.files = {
          card: '',
          image1: '',
          image2: '',
          image3: '',
          image4: '',
          video: '',
          clip: '',
        };
        for (let key in p.files) {
          p.files[key] = p[key];
          delete p[key];
        }
        return p;
      });
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
      state.currentImage = action.payload;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = state.allProjects[action.payload];
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
