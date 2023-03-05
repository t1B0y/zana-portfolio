import React from 'react';
import { Project } from '../styled-components/Projects.js';

const ProjectCard = (props) => {
  return (
    <Project>
      <img
        src={
          'https://static01.nyt.com/images/2021/07/17/arts/15west-end-covid1/merlin_190844712_e6abe7ba-161a-429d-8fe4-67b7e7a2b732-superJumbo.jpg?quality=75&auto=webp'
        }
      />
    </Project>
  );
};

export default ProjectCard;
