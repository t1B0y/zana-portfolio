import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fillForm, updateInput, submitProject } from '../../redux/formSlice';
import { useParams } from 'react-router-dom';
import { Form, Title } from './styledComponents/Form';

const ProjectForm = ({ add }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.form);
  const { projectTitle } = useParams();

  useEffect(() => {
    dispatch(fillForm(projectTitle));
  }, []);

  const handleChange = (e) => {
    let input = e.target.id;
    dispatch(updateInput({ input, value: e.target.value }));
  };

  return (
    <>
      <Title>{projectTitle}</Title>
      <Form className="addform-container">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="title"
            value={state.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subtitle" className="form-label">
            Subtitle
          </label>
          <input
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="subtitle"
            value={state.subtitle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label"></label>
          <textarea
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="body"
            rows="4"
            value={state.body}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="date"
            value={state.date}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <input
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="role"
            value={state.role}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="team" className="form-label">
            Team
          </label>
          <input
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="team"
            value={state.team}
          />
        </div>
        <button
          onClick={
            !add
              ? () => {}
              : (e) => {
                  e.preventDefault();
                  dispatch(submitProject(state));
                }
          }
          className="btn btn-primary"
        >
          {!add ? 'Edit project' : 'add New Project'}
        </button>
      </Form>
    </>
  );
};

export default ProjectForm;
