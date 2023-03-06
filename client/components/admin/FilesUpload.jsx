import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImagesWindow from './ImagesWindow.jsx';
import {
  fetchProjects,
  selectImage,
  fetchimages,
  selectProject,
} from '../../redux/projectsSlice';

const filesUpload = () => {
  const dispatch = useDispatch();
  const currentImage = useSelector((state) => state.projects.currentImage);
  const allProjects = useSelector((state) => state.projects.allProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  let options = [<option>Select a project</option>];
  for (let project of allProjects) {
    options.push(
      <option key={project.title + 'select'} value={project.title}>
        {project.title}
      </option>
    );
  }

  const handleSelectProject = (e) => {
    dispatch(selectProject(e.target.value));
  };

  const handleSelectImage = (e) => {
    dispatch(selectImage(e.target.value));
  };

  return (
    <>
      {currentImage && <ImagesWindow />}
      <p>Select a project</p>
      <select
        onChange={(e) => handleSelectProject(e)}
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
      >
        {options}
      </select>
      <p>Select an Image</p>
      <select
        onChange={(e) => handleSelectImage(e)}
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
      >
        <option>Select an image</option>
        <option value="frontImage">front Image</option>
        <option value="image1">image 1</option>
        <option value="image2">image 2</option>
        <option value="image3">image 3</option>
        <option value="image4">image 4</option>
      </select>
    </>
  );
};

export default filesUpload;
