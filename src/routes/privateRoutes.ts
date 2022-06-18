const dashboardRoutes = {
  ROOT: '/dashboard'
} as const;

const managementRoutes = {
  WAREHOUSES: '/management/warehouses'
} as const;

const PRIVATE_ROUTES = {
  DASHBOARD: dashboardRoutes,
  MANAGEMENT: managementRoutes
} as const;

type DashboardRoutes = ValueOf<typeof dashboardRoutes>;
type ManagementRoutes = ValueOf<typeof managementRoutes>;

export type PrivateRouteValues = DashboardRoutes | ManagementRoutes;

export default PRIVATE_ROUTES;
