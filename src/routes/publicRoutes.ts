const authRoutes = {
  SIGNIN: '/login',
  SIGNUP: '/register',
  FORGOT: '/auth/forgot-password',
  RESET: '/auth/reset-password',
  RESEND: '/auth/resend'
} as const;

const PUBLIC_ROUTES = {
  AUTH: authRoutes
} as const;

type AuthRoutes = ValueOf<typeof authRoutes>;

export type PublicRouteValues = AuthRoutes;

export default PUBLIC_ROUTES;
