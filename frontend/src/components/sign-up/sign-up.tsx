import { AppRoute, FormFieldLabel, FormFieldType } from 'common/enums/enums';
import { FC, RegisterUserRequestDto } from 'common/types/types';
import { FormField, Link, Sign } from 'components/common/common';
import {
  useDispatch,
  useSelector,
  useNavigate,
  useEffect,
  useForm,
} from 'hooks/hooks';
import { authActions } from 'store/actions';
import { signUpSchema } from 'validation-schemas/validation-schemas';

const SignUp: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError, user, isSignUpLoading } = useSelector(
    ({ auth, request }) => ({
      authError: auth.error,
      user: auth.user,
      isSignUpLoading: request.authRegister,
    }),
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserRequestDto>(signUpSchema);

  useEffect(() => {
    if (!authError && user?.id) {
      navigate(AppRoute.ROOT);
    }
  }, [authError, user?.id]);

  const handleSubmitForm = (data: RegisterUserRequestDto): void => {
    dispatch(authActions.register(data));
  };

  return (
    <Sign
      authError={authError}
      header="Get Started"
      description="Create new account to continue"
      submitText="Sign up"
      onSubmit={handleSubmit(handleSubmitForm)}
      isSubmitDisabled={isSignUpLoading}
      alternativeRoute={{
        // prettier-ignore
        label: 'Already have an account?',
        linkText: 'Log in',
        path: AppRoute.LOG_IN,
      }}
    >
      <FormField
        label={FormFieldLabel.NICKNAME}
        type={FormFieldType.TEXT}
        placeholder="Enter your nickname"
        register={register('nickname')}
        error={errors.nickname}
      />
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

export { SignUp };
