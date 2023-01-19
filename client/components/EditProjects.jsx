import React, { useState } from "react";
import AccordeonProject from "./AccordeonProject.jsx";

import { useSelector, useDispatch } from "react-redux";
import Form from "./Form.jsx";

const EditProject = (props) => {
  const [showAddProject, setshowAddProject] = useState(false);
  const projects = props.projects.map((p, i) => (
    <AccordeonProject key={i + "acc"} idx={i} project={p} />
  ));
  return (
    <>
      {!showAddProject ? (
        <>
          <div className="accordion">{projects}</div>
          <button
            onClick={() => setshowAddProject(true)}
            type="button"
            class="btn btn-primary btn-lg"
          >
            Add new project
          </button>
        </>
      ) : (
        <>
          <Form addForm />
          <button
            onClick={() => setshowAddProject(false)}
            type="button"
            class="btn btn-secondary btn-lg"
          >
            Go back
          </button>
        </>
      )}
    </>
  );
};

export default EditProject;
