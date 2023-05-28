import _ from 'lodash';
import { FC, UserDto } from 'common/types/types';
import {
  useState,
  useEffect,
  useParams,
  useDispatch,
  useSelector,
  useRef,
  useForm,
  useNavigate,
} from 'hooks/hooks';
import { profile as profileActions } from 'store/modules/actions';
import {
  AppRoute,
  AvatarSize,
  CommonKey,
  ContentWrapperSize,
  FormFieldLabel,
  FormFieldType,
  SpinnerSize,
  UserKey,
} from 'common/enums/enums';
import { updateUserInfoSchema } from 'validation-schemas/validation-schemas';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from 'common/constants/constants';
import { RBForm } from 'components/external/external';
import {
  Avatar,
  FormField,
  Spinner,
  ContentWrapper,
  Button,
} from 'components/common/common';
import { clsx, bytesToMegabytes } from 'helpers/helpers';
import { notification as notificationService } from 'services/services';
import { ValidationErrorMessage } from 'common/enums/enums';
import { CropAvatar } from './components/components';

import styles from './styles.module.scss';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    currentUserId,
    user,
    isUserLoading,
    isPersonalInfoUpdateLoading,
    isAvatarUpdateLoading,
    isAvatarDeleteLoading,
  } = useSelector(({ auth, profile, requests }) => ({
    currentUserId: auth.user?.id,
    user: profile.user,
    statistics: profile.statistics,
    rating: profile.rating,
    isUserLoading: requests.profileLoadUser,
    isPersonalInfoUpdateLoading: requests.profileUpdatePersonalInfo,
    isAvatarUpdateLoading: requests.profileUpdateAvatar,
    isAvatarDeleteLoading: requests.profileDeleteAvatar,
  }));
  const isApplyLoading =
    isPersonalInfoUpdateLoading ||
    isAvatarUpdateLoading ||
    isAvatarDeleteLoading;
  const { userId } = useParams();
  const isCurrentUser = currentUserId === userId;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(profileActions.loadUser({ userId: Number(userId) }));
    }
  }, [userId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<Omit<UserDto, CommonKey.ID>>(
    updateUserInfoSchema,
    _.omit(user ?? ({} as Omit<UserDto, CommonKey.ID>), CommonKey.ID),
  );

  const handleDeleteAvatar = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setValue(UserKey.PHOTO_URL, null);
    setSelectedFile(null);
  };

  const handleUploadAvatar = (): void => {
    inputRef.current?.click();
  };

  const handleSaveChanges = async (
    data: Omit<UserDto, CommonKey.ID>,
  ): Promise<void> => {
    if (!user) {
      return;
    }
    const changes: Partial<Omit<UserDto, CommonKey.ID>> = _.omitBy(
      data,
      (value, key) => {
        return _.isEqual(value, user[key as keyof UserDto]);
      },
    );
    if (changes.photoUrl && selectedFile) {
      dispatch(profileActions.updateAvatar(selectedFile));
      setSelectedFile(null);
    }
    if (_.isNull(changes.photoUrl)) {
      dispatch(profileActions.deleteAvatar());
    }
    if (changes.email || changes.nickname) {
      const personalInfo = _.omit(changes, 'photoUrl');
      dispatch(profileActions.updatePersonalInfo(personalInfo));
    }
  };

  const handleFileSelected = (
    fileSelectedEvent: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const [file] = fileSelectedEvent.target.files ?? [];
    if (file) {
      const { size, type } = file;
      const sizeInMegabytes = bytesToMegabytes(size);
      if (sizeInMegabytes > MAX_FILE_SIZE) {
        notificationService.error(ValidationErrorMessage.INVALID_FILE_SIZE);
        return;
      }
      if (!ALLOWED_FILE_TYPES.includes(type)) {
        notificationService.error(ValidationErrorMessage.FORBIDDEN_FILE_TYPE);
        return;
      }
      setSelectedFile(file);
      setIsCropModalVisible(true);
    }
  };
  const handleCropModalClose = (): void => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setIsCropModalVisible(false);
  };
  const updateAvatar = async (
    croppedFile: File,
    croppedFileUrl: string,
  ): Promise<void> => {
    setSelectedFile(croppedFile);
    setValue('photoUrl', croppedFileUrl);
    setIsCropModalVisible(false);
  };

  if (!userId) {
    navigate(AppRoute.ROOT);
  }

  if (isUserLoading) {
    return <Spinner size={SpinnerSize.LARGE} />;
  }

  const { nickname, photoUrl } = getValues();
  return (
    <>
      <ContentWrapper
        size={ContentWrapperSize.MEDIUM}
        className={styles.settings}
      >
        <h1>Customize your experience</h1>
        <RBForm className={styles.form}>
          <FormField
            label={FormFieldLabel.AVATAR}
            type={FormFieldType.FILE}
            register={register(UserKey.PHOTO_URL, {
              onChange: handleFileSelected,
            })}
            error={errors.photoUrl}
            note={
              <span>
                For best results use an image at least 128px in .jpg format
              </span>
            }
            ref={inputRef}
            hidden
          />
          <Avatar name={nickname} src={photoUrl} size={AvatarSize.LARGE} />
          {isCurrentUser && (
            <>
              <Button
                onClick={handleUploadAvatar}
                isDisabled={!user}
                isLoading={isAvatarUpdateLoading}
                label="Upload"
                className={clsx(styles.button, styles.uploadAvatarButton)}
              />
              {photoUrl && (
                <Button
                  onClick={handleDeleteAvatar}
                  isDisabled={!user}
                  isLoading={isAvatarUpdateLoading}
                  label="Delete"
                  className={clsx(styles.button, styles.deleteAvatarButton)}
                />
              )}
            </>
          )}
          <span className={clsx(styles.uploadText, 'fs-6')}>
            For best results use an image at least 128px in .jpg format
          </span>
          <FormField
            label={FormFieldLabel.NICKNAME}
            type={FormFieldType.TEXT}
            register={register(UserKey.NICKNAME)}
            error={errors.nickname}
            readOnly={!isCurrentUser}
          />
          <FormField
            label={FormFieldLabel.EMAIL}
            type={FormFieldType.TEXT}
            register={register(UserKey.EMAIL)}
            error={errors.email}
            readOnly={!isCurrentUser}
          />
          {isCurrentUser && (
            <Button
              onClick={handleSubmit(handleSaveChanges)}
              isDisabled={!user}
              isLoading={isApplyLoading}
              label="Apply"
              className={clsx(styles.button, styles.submitButton)}
            />
          )}
        </RBForm>
      </ContentWrapper>
      <CropAvatar
        isVisible={isCropModalVisible}
        file={selectedFile}
        onClose={handleCropModalClose}
        updateAvatar={updateAvatar}
      />
    </>
  );
};

export { Profile };
