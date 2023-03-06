import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { useQueryClientDefaultOptions } from 'src/hooks/common'
import BaseLayout from 'src/layouts/BaseLayout'
import SidebarLayout from 'src/layouts/SidebarLayout'
import DashboardOverview from './dashboard'
import Login from './Login'
import Products from './management/products'
import StoreDetailsPage from './management/stores/details/store-details-page'
import StoresPage from './management/stores/list/stores-page'
import SettingsPage from './management/users/settings/settings-page'
import WarehouseDetailsPage from './management/warehouses/details/warehouse-details-page'
import WarehousesPage from './management/warehouses/list/warehouses-page'
import Register from './register'
import Status404 from './status/Status404'

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
