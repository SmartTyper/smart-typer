import { AppRoute, StorageKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { ProtectedRoute, WithHeader } from 'components/common/common';
import {
  Home,
  Lessons,
  LogIn,
  LogInGoogle,
  Profile,
  Racing,
  ResetPassword,
  SetPassword,
  Settings,
  SignUp,
  StudyPlan,
  Theory,
} from 'components/components';
import { RRDRoute, RRDRoutes } from 'components/external/external';
import { replaceRouteIdParam } from 'helpers/helpers';
import { useDispatch, useEffect, useLocation, useSelector } from 'hooks/hooks';
import { localStorage as localStorageService } from 'services/services';
import { auth as authActions } from 'store/modules/actions';

const App: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const token = localStorageService.getItem(StorageKey.ACCESS_TOKEN);

  const authRoutes = [
    AppRoute.LOG_IN,
    AppRoute.SIGN_UP,
    AppRoute.LOG_IN_GOOGLE,
  ] as string[];
  const isAuth = authRoutes.includes(pathname);

  useEffect(() => {
    if (token && !user && !isAuth) {
      dispatch(authActions.loadUser());
    }
  }, []);

  return (
    <RRDRoutes>
      <RRDRoute
        element={
          <ProtectedRoute
            hasUser={!!user}
            isUserLoading={!!token && !user && !isAuth}
          />
        }
      >
        <RRDRoute
          path={AppRoute.ROOT}
          element={
            <WithHeader>
              <Home />
            </WithHeader>
          }
        />
        <RRDRoute
          path={AppRoute.THEORY}
          element={
            <WithHeader>
              <Theory />
            </WithHeader>
          }
        />
        <RRDRoute
          path={AppRoute.LESSONS}
          element={
            <WithHeader>
              <Lessons />
            </WithHeader>
          }
        />
        <RRDRoute
          path={AppRoute.STUDY_PLAN}
          element={
            <WithHeader>
              <StudyPlan />
            </WithHeader>
          }
        />
        <RRDRoute
          path={AppRoute.RACING}
          element={
            <WithHeader>
              <Racing />
            </WithHeader>
          }
        />
        <RRDRoute
          path={replaceRouteIdParam(AppRoute.USERS_$ID_PROFILE, user?.id)}
          element={
            <WithHeader>
              <Profile />
            </WithHeader>
          }
        />
        <RRDRoute
          path={AppRoute.SETTINGS}
          element={
            <WithHeader>
              <Settings />
            </WithHeader>
          }
        />
      </RRDRoute>
      <RRDRoute path={AppRoute.SIGN_UP} element={<SignUp />} />
      <RRDRoute path={AppRoute.LOG_IN_GOOGLE} element={<LogInGoogle />} />
      <RRDRoute path={AppRoute.LOG_IN} element={<LogIn />} />
      <RRDRoute path={AppRoute.RESET_PASSWORD} element={<ResetPassword />} />
      <RRDRoute path={AppRoute.SET_PASSWORD} element={<SetPassword />} />
    </RRDRoutes>
  );
};

export default App;
