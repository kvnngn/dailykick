import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import Login from './pages/Login';
import Register from './pages/Register';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards

const Overview = Loader(lazy(() => import('src/pages/dashboard')));

// Applications

const Warehouses = Loader(
  lazy(() => import('src/pages/applications/Warehouses'))
);
const UserProfile = Loader(
  lazy(() => import('src/pages/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/pages/applications/Users/settings'))
);

// Status

const Status404 = Loader(lazy(() => import('src/pages/Status/Status404')));

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/signin" replace />
      },
      {
        path: 'signin',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Overview />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="Warehouses" replace />
      },
      {
        path: 'Warehouses',
        element: <Warehouses />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  }
];

export default routes;
