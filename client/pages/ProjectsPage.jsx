import React from 'react';
import Logo from '../components/front-page/components/Logo.jsx';
import NavBar from '../components/front-page/components/NavBar.jsx';
import Projects from '../components/front-page/components/Projects.jsx';

const ProjectsPage = (props) => {
  return (
    <>
      <Logo />
      <NavBar />
      <Projects />
    </>
  );
};

export default ProjectsPage;
