import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchimages } from '../../redux/projectsSlice.js';
import { Image } from './styledComponents/AdminComponents';

const ImagesWindow = (props) => {
  const currentImage = useSelector((state) => state.projects.currentImage);
  const project = useSelector((state) => state.projects.currentProject);
  return (
    <div>
      <h4>Change Image</h4>
      <Image src={project.files[currentImage]} />
    </div>
  );
};

export default ImagesWindow;
