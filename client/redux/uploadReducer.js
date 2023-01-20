import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectId: 0,
  title: "",
  imageName: "",
};

const uploadSlice = createSlice({
  name: "upload",
  initialState: initialState,
  reducers: {
    setTitle: (state, action) => {
      console.log(action);
      state.title = action.payload.title;
      state.projectId = action.payload.id;
    },
    setImageName: (state, action) => {
      state.imageName = action.payload;
    },
  },
});
export const { setTitle, setImageName } = uploadSlice.actions;
export default uploadSlice.reducer;
