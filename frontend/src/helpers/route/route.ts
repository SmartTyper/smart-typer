import { AppRoute } from 'common/enums/enums';

const replaceRouteIdParam = (route: AppRoute, id: number): AppRoute => {
  return route.replace(':id', encodeURIComponent(id)) as AppRoute;
};
export { replaceRouteIdParam };
