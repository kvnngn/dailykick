import PUBLIC_ROUTES from './publicRoutes';
import PRIVATE_ROUTES from './privateRoutes';
import type { PublicRouteValues } from './publicRoutes';
import type { PrivateRouteValues } from './privateRoutes';

export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...PRIVATE_ROUTES,
} as const;

export const routePaths = Object.values(ROUTES)
  .map((route) => Object.values(route))
  .reduce((accum, value) => accum.concat(value, []));

type SubRoutes = typeof ROUTES[keyof typeof ROUTES];
export type RouteValues = PublicRouteValues | PrivateRouteValues;

export const matchExactPath = (type: SubRoutes, path: string): boolean =>
  Object.values(type).findIndex((r) => r === path) !== -1;

export const includesPath = (type: SubRoutes, path: string): boolean =>
  Object.values(type).findIndex((r) => path.startsWith(r)) !== -1;
