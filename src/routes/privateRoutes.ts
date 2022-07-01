const dashboardRoutes = {
  ROOT: '/dashboard',
} as const

const managementRoutes = {
  WAREHOUSES: '/management/warehouses',
  STORES: '/management/stores',
  PRODUCTS: '/management/products',
  ARTICLES: '/management/articles',
} as const

const profileRoutes = {
  DETAILS: '/profile/details',
  SETTINGS: '/profile/settings',
} as const

const PRIVATE_ROUTES = {
  DASHBOARD: dashboardRoutes,
  MANAGEMENT: managementRoutes,
  PROFILE: profileRoutes,
} as const

type DashboardRoutes = ValueOf<typeof dashboardRoutes>
type ManagementRoutes = ValueOf<typeof managementRoutes>
type ProfileRoutes = ValueOf<typeof profileRoutes>

export type PrivateRouteValues =
  | DashboardRoutes
  | ManagementRoutes
  | ProfileRoutes

export default PRIVATE_ROUTES
