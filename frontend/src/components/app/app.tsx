import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { RRDRoute, RRDRoutes } from 'components/external/external';
import { WithHeader } from 'components/common/hocs/hocs';
import { Home } from 'components/home/home';
import { Theory } from 'components/theory/theory';
import { Lessons } from 'components/lessons/lessons';
import { StudyPlan } from 'components/study-plan/study-plan';
import { Racing } from 'components/racing/racing';
import { SignIn } from 'components/sign-in/sign-in';
import { SignUp } from 'components/sign-up/sign-up';
import { Settings } from 'components/settings/settings';
import { Profile } from 'components/profile/profile';

const App: FC = () => {
  return (
    <RRDRoutes>
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
        path={AppRoute.PROFILE}
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
      <RRDRoute path={AppRoute.SIGN_IN} element={<SignIn />} />
      <RRDRoute path={AppRoute.SIGN_UP} element={<SignUp />} />
    </RRDRoutes>
  );
};

export default App;
