import { AppRoute } from 'common/enums/enums';

const replaceRouteIdParam = (
  route: AppRoute,
  id: number | undefined,
): AppRoute => {
  return id
    ? (route.replace(':id', encodeURIComponent(id)) as AppRoute)
    : AppRoute.ROOT;
};
export { replaceRouteIdParam };
