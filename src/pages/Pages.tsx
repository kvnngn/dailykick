import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useQueryClientDefaultOptions } from 'src/hooks/common';
import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Warehouses from './management/Warehouses';
import DashboardOverview from './dashboard';
import Login from './Login';
import Register from './Register';
import Status404 from './Status/Status404';
import ManagementUserProfile from './management/Users/profile';
import ManagementUserSettings from './management/Users/settings';

const Pages: React.FC = () => {
  useQueryClientDefaultOptions();
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route element={<BaseLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<SidebarLayout />}>
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="management">
          <Route path="/management" element={<Navigate to="warehouses" replace />} />
          <Route path="warehouses" element={<Warehouses />} />
          <Route path="profile">
            <Route index element={<Navigate to="details" replace />} />
            <Route path="/management/profile" element={<Navigate to="details" replace />} />
            <Route path="details" element={<ManagementUserProfile />} />
            <Route path="settings" element={<ManagementUserSettings />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Status404 />} />
    </Routes>
  );
};

export default Pages;
