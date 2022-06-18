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

const Pages: React.FC = () => {
  useQueryClientDefaultOptions();
  return (
    <Routes>
      <Route index element={<Navigate to="overview" replace />} />
      <Route element={<BaseLayout />}>
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Route>
      <Route element={<SidebarLayout />}>
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="management">
          <Route path="warehouses" element={<Warehouses />} />
        </Route>
      </Route>
      <Route path="*" element={<Status404 />} />
    </Routes>
  );
};

export default Pages;
