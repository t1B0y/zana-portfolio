import React, { useEffect, useRef } from 'react';
import { fetchProjects } from '../../redux/projectsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { List, DragIcon } from './styledComponents/AdminComponents';
import ProjectListItem from './ProjectListItem.jsx';

const ListProjects = (props) => {
  const projects = useSelector((state) => state.projects.allProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [projects]);

  const list = projects.map((p, i) => (
    <ProjectListItem
      key={'pl' + i}
      title={p.title}
      id={p.id}
      databasePos={p.position}
      pos={i}
    />
  ));

  return (
    <>
      <h1>Projects</h1>
      <List className="list-group">{list}</List>
    </>
  );
};

export default ListProjects;
