import { Sign, FormField } from 'components/common/common';
import { resetPasswordSchema } from 'validation-schemas/validation-schemas';
import { FormFieldLabel, FormFieldType } from 'common/enums/enums';
import { FC, ResetPasswordRequestDto } from 'common/types/types';
import { useForm, useDispatch, useSelector } from 'hooks/hooks';
import { auth as authActions } from 'store/modules/actions';

const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const { authError, isResetPasswordLoading } = useSelector(
    ({ auth, requests }) => ({
      authError: auth.error,
      isResetPasswordLoading: requests.authResetPassword,
    }),
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordRequestDto>(resetPasswordSchema);

  const handleSubmitForm = async (
    data: ResetPasswordRequestDto,
  ): Promise<void> => {
    dispatch(authActions.resetPassword(data));
  };

  return (
    <Sign
      authError={authError}
      header="Reset password"
      description="Enter your email to reset your password."
      submitText="Reset password"
      onSubmit={handleSubmit(handleSubmitForm)}
      isSubmitDisabled={isResetPasswordLoading}
    >
      <FormField
        label={FormFieldLabel.EMAIL}
        type={FormFieldType.EMAIL}
        placeholder="Enter your email"
        register={register('email')}
        error={errors.email}
      />
    </Sign>
  );
};

export { ResetPassword };
