import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Route, Routes } from 'components/common/common';
import { SignIn } from 'components/sign-in/sign-in';
import { SignUp } from 'components/sign-up/sign-up';

const App: FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<></>} />
      <Route path={AppRoute.SIGN_IN} element={<SignIn />} />
      <Route path={AppRoute.SIGN_UP} element={<SignUp />} />
    </Routes>
  );
};

export default App;
