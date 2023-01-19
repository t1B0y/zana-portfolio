import React, { useEffect } from "react";
import EditProjects from "./components/EditProjects.jsx";
import FilesUpload from "./components/FilesUpload.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "./redux/reducer";

const App = (props) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.projects);
  // projects: Array(0)
  // loggedIn: false
  // loading: true
  //console.log(state);
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <div>
      <h1>my App</h1>
      {/* <EditProjects projects={state.projects} /> */}
      <FilesUpload />
    </div>
  );
};

export default App;
