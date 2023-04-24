import { AppRoute } from 'common/enums/enums';
import { FC, LogInUserRequestDto } from 'common/types/types';
import { Sign } from 'components/common/common';
import {
  useDispatch,
  useSelector,
  useNavigate,
  useEffect,
  useForm,
} from 'hooks/hooks';
import { authActions } from 'store/actions';
import { logInSchema } from 'validation-schemas/validation-schemas';

const LogIn: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userNotExistsError, user } = useSelector((state) => state.auth);
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm<LogInUserRequestDto>(logInSchema);

  const handleSubmitForm = (data: LogInUserRequestDto): void => {
    dispatch(authActions.logIn(data));
  };

  useEffect(() => {
    if (!userNotExistsError && user?.id) {
      navigate(AppRoute.ROOT);
    }
  }, [userNotExistsError, user?.id]);

  return (
    <Sign
      userNotExistsError={userNotExistsError}
      header="Welcome back"
      description="Log in to your account to continue"
      submitText="Log in"
      onSubmit={handleSubmit(handleSubmitForm)}
      alternativeRoute={{
        // prettier-ignore
        label: 'Don\'t have an account?',
        linkText: 'Sign up',
        path: AppRoute.SIGN_UP,
      }}
    >
      <></>
    </Sign>
  );
};

export { LogIn };
