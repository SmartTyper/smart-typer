import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Route, Routes } from 'components/common/common';
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
    <Routes>
      <Route
        path={AppRoute.ROOT}
        element={
          <WithHeader>
            <Home />
          </WithHeader>
        }
      />
      <Route
        path={AppRoute.THEORY}
        element={
          <WithHeader>
            <Theory />
          </WithHeader>
        }
      />
      <Route
        path={AppRoute.LESSONS}
        element={
          <WithHeader>
            <Lessons />
          </WithHeader>
        }
      />
      <Route
        path={AppRoute.STUDY_PLAN}
        element={
          <WithHeader>
            <StudyPlan />
          </WithHeader>
        }
      />
      <Route
        path={AppRoute.RACING}
        element={
          <WithHeader>
            <Racing />
          </WithHeader>
        }
      />
      <Route
        path={AppRoute.PROFILE}
        element={
          <WithHeader>
            <Profile />
          </WithHeader>
        }
      />
      <Route
        path={AppRoute.SETTINGS}
        element={
          <WithHeader>
            <Settings />
          </WithHeader>
        }
      />
      <Route path={AppRoute.SIGN_IN} element={<SignIn />} />
      <Route path={AppRoute.SIGN_UP} element={<SignUp />} />
    </Routes>
  );
};

export default App;
