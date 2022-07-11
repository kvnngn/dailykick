import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { useQueryClientDefaultOptions } from 'src/hooks/common'
import BaseLayout from 'src/layouts/BaseLayout'
import SidebarLayout from 'src/layouts/SidebarLayout'
import DashboardOverview from './dashboard'
import Login from './Login'
import Register from './Register'
import Status404 from './Status/Status404'
import Products from './Management/Products'
import WarehouseDetailsPage from './Management/Warehouses/details/WarehouseDetailsPage'
import WarehousesPage from './Management/Warehouses/list/WarehousesPage'
import StoresPage from './Management/Stores/list/StoresPage'
import StoreDetailsPage from './Management/Stores/details/StoreDetailsPage'
import SettingsPage from './Management/Users/settings/SettingsPage'

const Pages: React.FC = () => {
  useQueryClientDefaultOptions()
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
          <Route
            path="/management"
            element={<Navigate to="warehouses" replace />}
          />
          <Route path="warehouses" element={<WarehousesPage />} />
          <Route path="warehouses/:id" element={<WarehouseDetailsPage />} />
          <Route path="products" element={<Products />} />
          <Route path="stores" element={<StoresPage />} />
          <Route path="stores/:id" element={<StoreDetailsPage />} />
          <Route path="store/:id" element={<StoreDetailsPage />} />
        </Route>
        <Route path="profile">
          <Route path="/profile" element={<Navigate to="settings" replace />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Status404 />} />
    </Routes>
  )
}

export default Pages
