import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../redux/reducer";

const Form = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const project = useSelector((state) => {
    if (props.addForm)
      return {
        title: "",
        subtitle: "",
        body: "",
        date: "",
        role: "",
        team: "",
      };
    else return state.projects.projects[props.idx];
  });

  const [formState, setFormState] = useState({ ...project });

  const handleChange = (key, val) => {
    setFormState({ ...formState, [key]: val });
  };

  const submitEdit = (projectTitle, body) => {
    fetch(`http://localhost:3000/${projectTitle}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => console.log("change submitted to db"))
      .catch((err) => console.log(err));
  };

  const sendDelete = (projectId) => {
    fetch(`http://localhost:3000/${projectId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => dispatch(fetchProjects()))
      .catch((err) => console.log(err));
  };

  const submitAdd = (body) => {
    fetch(`http://localhost:3000/project`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form className="addform-container">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          className="form-control"
          id="title"
          value={formState.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="subtitle" className="form-label">
          Subtitle
        </label>
        <input
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          className="form-control"
          id="subtitle"
          value={formState.subtitle}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label"></label>
        <textarea
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          className="form-control"
          id="body"
          rows="4"
          value={formState.body}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          className="form-control"
          id="date"
          value={formState.date}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <input
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          className="form-control"
          id="role"
          value={formState.role}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="team" className="form-label">
          Team
        </label>
        <input
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          className="form-control"
          id="team"
          value={formState.team}
        />
      </div>
      <button
        onClick={
          !props.addForm
            ? () => submitEdit(project.title, formState)
            : () => submitAdd(formState)
        }
        className="btn btn-primary"
      >
        {!props.addForm ? "Edit project" : "addNew Project"}
      </button>
      {!props.addForm && (
        <button
          onClick={() => sendDelete(project.id)}
          type="button"
          class="btn btn-danger"
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default Form;
