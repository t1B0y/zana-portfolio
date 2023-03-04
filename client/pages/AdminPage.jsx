import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import ListProjects from '../components/admin/ListProjects.jsx';
import FilesUpload from '../components/admin/FilesUpload.jsx';
import SideMenu from '../components/admin/SideMenu.jsx';
import ProjectForm from '../components/admin/ProjectForm.jsx';
import { Page } from '../components/admin/styledComponents/Layout.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const AdminPage = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <SideMenu />
        <Page>
          <Routes>
            <Route
              path="edit-projects/:projectTitle"
              element={<ProjectForm />}
            />
            <Route path="add-project" element={<ProjectForm add />} />
            <Route path="edit-projects" element={<ListProjects />} />
            <Route path="upload-images" element={<FilesUpload />} />
          </Routes>
          <Outlet />
        </Page>
      </div>
    </DndProvider>
  );
};

export default AdminPage;
