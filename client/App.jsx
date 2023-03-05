import React, { useState, useEffect } from 'react';
import FilesUpload from './components/admin/FilesUpload.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        {/* <Route path="/" element={<AdminPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
