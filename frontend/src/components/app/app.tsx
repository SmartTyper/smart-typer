import { AppRoute, StorageKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { RRDRoute, RRDRoutes } from 'components/external/external';
import { WithHeader, ProtectedRoute } from 'components/common/common';
import { Home } from 'components/home/home';
import { Theory } from 'components/theory/theory';
import { Lessons } from 'components/lessons/lessons';
import { StudyPlan } from 'components/study-plan/study-plan';
import { LogIn } from 'components/log-in/log-in';
import { SignUp } from 'components/sign-up/sign-up';
import { Settings } from 'components/settings/settings';
import { Profile } from 'components/profile/profile';
import {
  useSelector,
  useDispatch,
  useEffect,
  useLocation,
  useState,
} from 'hooks/hooks';
import { localStorage as localStorageService } from 'services/services';
import { auth as authActions } from 'store/modules/actions';
import { LogInGoogle } from 'components/log-in-google/log-in-google';
import { Racing } from 'components/racing/racing';
import { replaceRouteIdParam } from 'helpers/helpers';

const App: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user, isUserRequestLoading } = useSelector(({ auth, requests }) => ({
    user: auth.user,
    isUserRequestLoading: requests.authLoadCurrentUser,
  }));

  const token = localStorageService.getItem(StorageKey.ACCESS_TOKEN);

  const authRoutes = [
    AppRoute.LOG_IN,
    AppRoute.SIGN_UP,
    AppRoute.LOG_IN_GOOGLE,
  ] as string[];
  const isAuth = authRoutes.includes(pathname);
  const needToLoadUser = !!token && !user && !isAuth;

  const [isUserLoading, setIsUserLoading] = useState(needToLoadUser);

  useEffect(() => {
    if (needToLoadUser) {
      dispatch(authActions.loadCurrentUser());
    }
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(isUserRequestLoading);
    setIsUserLoading(isUserRequestLoading);
  }, [isUserRequestLoading, user]);

  return (
    <RRDRoutes>
      <RRDRoute
        element={
          <ProtectedRoute hasUser={!!user} isUserLoading={isUserLoading} />
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
    </RRDRoutes>
  );
};

export default App;
