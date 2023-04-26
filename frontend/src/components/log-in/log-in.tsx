import { AppRoute, FormFieldLabel, FormFieldType } from 'common/enums/enums';
import { FC, LogInUserRequestDto } from 'common/types/types';
import { FormField, Link, Sign } from 'components/common/common';
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
  const { authError, user, isLogInLoading } = useSelector(
    ({ auth, request }) => ({
      authError: auth.error,
      user: auth.user,
      isLogInLoading: request.authLogIn,
    }),
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInUserRequestDto>(logInSchema);

  useEffect(() => {
    if (!authError && user?.id) {
      navigate(AppRoute.ROOT);
    }
  }, [authError, user?.id]);

  const handleSubmitForm = (data: LogInUserRequestDto): void => {
    dispatch(authActions.logIn(data));
  };

  return (
    <Sign
      authError={authError}
      header="Welcome back"
      description="Log in to your account to continue"
      submitText="Log in"
      onSubmit={handleSubmit(handleSubmitForm)}
      isSubmitDisabled={isLogInLoading}
      alternativeRoute={{
        // prettier-ignore
        label: 'Don\'t have an account?',
        linkText: 'Sign up',
        path: AppRoute.SIGN_UP,
      }}
    >
      <FormField
        label={FormFieldLabel.EMAIL}
        type={FormFieldType.EMAIL}
        placeholder="Enter your email"
        register={register('email')}
        error={errors.email}
      />
      <FormField
        label={FormFieldLabel.PASSWORD}
        type={FormFieldType.PASSWORD}
        register={register('password')}
        placeholder="Enter your password"
        error={errors.password}
        note={
          <Link to={AppRoute.RESET_PASSWORD}>
            <span>Forgot password?</span>
          </Link>
        }
      />
    </Sign>
  );
};

export { LogIn };
