import React, { useState, useEffect } from 'react';
import FilesUpload from './components/admin/FilesUpload.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import { fetchProjects } from './redux/projectsSlice.js';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/" element={<ProjectsPage />} />
      </Routes>
    </div>
  );
};

export default App;
