import React from 'react';
import { Menu, NavLink, MenuTitle } from './styledComponents/SideBar';

const SideMenu = (props) => {
  return (
    <Menu>
      <MenuTitle>Marvin Portfolio</MenuTitle>
      <NavLink to="edit-projects">My Projects</NavLink>
      <NavLink to="add-Project">Add a Project</NavLink>
      <NavLink to="upload-images">Upload Image</NavLink>
    </Menu>
  );
};

export default SideMenu;
