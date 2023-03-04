import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  title: '',
  subtitle: '',
  body: '',
  date: '',
  role: '',
  team: '',
  message: '',
};

export const submitProject = (form) => (dispatch, getState) => {
  const body = {
    ...form,
    position: getState().projects.allProjects.length + 1,
  };
  delete body.message;
  console.log(body);
  axios
    .post(`http://localhost:3000/project`, body)
    .then((res) => dispatch(formSlice.actions.setMessage(res.data)))
    .catch((err) => dispatch(formSlice.actions.setMessage(err.message)));
};

export const submitEdit = (projectTitle, body) => (dispatch) => {
  axios
    .put(`http://localhost:3000/project/${projectTitle}`, body)
    .then((res) => dispatch(formSlice.actions.setMessage(res.data)))
    .catch((err) => dispatch(formSlice.actions.setMessage(err.message)));
};

export const fillForm = (projectTitle) => (dispatch) => {
  axios
    .get(`http://localhost:3000/project/${projectTitle}`)
    .then((res) => dispatch(formSlice.actions.setForm(res.data)))
    .catch((err) => dispatch(formSlice.actions.setMessage(err.message)));
};

export const sendDelete = (projectId) => (dispatch) => {
  axios
    .delete(`http://localhost:3000/project/${projectId}`)
    .then((res) => dispatch(formSlice.actions.setMessage(res.data)))
    .catch((err) => dispatch(formSlice.actions.setMessage(err.message)));
};

const formSlice = createSlice({
  name: 'images',
  initialState: initialState,
  reducers: {
    updateInput: (state, action) => {
      state[action.payload.input] = action.payload.value;

      // return { ...state, [action.payload.input]: action.payload.value };
    },
    resetForm: (state, action) => {
      state = {
        title: '',
        subtitle: '',
        body: '',
        date: '',
        role: '',
        team: '',
        message: '',
      };
    },
    setForm: (state, action) => {
      console.log(action.payload);
      for (let key in action.payload) {
        if (key !== 'id') state[key] = action.payload[key];
      }
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { updateInput } = formSlice.actions;
export default formSlice.reducer;
