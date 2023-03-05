import React, { useEffect } from "react";
import Form from "./Form.jsx";

import { useSelector, useDispatch } from "react-redux";

const AccordeonProject = (props) => {
  const { project, idx } = props;
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={"heading" + idx}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#collapse" + idx}
          aria-expanded="false"
          aria-controls={"collapse" + idx}
        >
          {project.title}
        </button>
      </h2>
      <div
        id={"collapse" + idx}
        className="accordion-collapse collapse"
        aria-labelledby={"heading" + idx}
        data-bs-parent=".accordion"
      >
        <div className="accordion-body">
          <Form idx={idx} title={project.title} />
        </div>
      </div>
    </div>
  );
};

export default AccordeonProject;
