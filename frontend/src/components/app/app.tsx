import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Route, Routes } from 'components/common/common';
import { Home } from 'components/home/home';
import { SignIn } from 'components/sign-in/sign-in';
import { SignUp } from 'components/sign-up/sign-up';

const App: FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Home />} />
      <Route path={AppRoute.SIGN_IN} element={<SignIn />} />
      <Route path={AppRoute.SIGN_UP} element={<SignUp />} />
    </Routes>
  );
};

export default App;
