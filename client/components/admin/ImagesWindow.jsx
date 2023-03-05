import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchimages } from '../../redux/projectsSlice.js';
import { Image } from './styledComponents/AdminComponents';

const ImagesWindow = (props) => {
  const imageSelected = useSelector((state) => state.projects.currentImage);

  return (
    <div>
      <h4>Change Image</h4>
      <Image src={imageSelected} />
    </div>
  );
};

export default ImagesWindow;
