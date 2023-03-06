import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectsContainer } from '../styled-components/Projects.js';
import ProjectCard from './ProjectCard.jsx';
const Projects = (props) => {
  const projects = useSelector((state) => state.projects.allProjects);
  return (
    <ProjectsContainer>
      {projects.map((p, i) => (
        <ProjectCard key={'card ' + i} />
      ))}
    </ProjectsContainer>
  );
};

export default Projects;
