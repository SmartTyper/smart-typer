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
  CommonKey,
  ContentWrapperSize,
  FormFieldType,
  SpinnerSize,
  UserKey,
} from 'common/enums/enums';
import { updateUserInfoSchema } from 'validation-schemas/validation-schemas';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from 'common/constants/constants';
import { Avatar, Spinner } from 'components/common/common';
import { clsx, bytesToMegabytes } from 'helpers/helpers';
import { CropAvatar } from './components/components';
import { notification as notificationService } from 'services/services';
import { ValidationErrorMessage } from 'common/enums/enums';
import { ContentWrapper } from 'components/common/common';

import styles from './styles.module.scss';
import { RBForm } from 'components/external/external';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    user,
    isUserLoading,
    isUpdateLoading,
    isPersonalInfoUpdateLoading,
    isAvatarUpdateLoading,
    isAvatarDeleteLoading,
  } = useSelector(({ profile, requests }) => ({
    user: profile.user,
    statistics: profile.statistics,
    rating: profile.rating,
    isUserLoading: requests.profileLoadUser,
    isPersonalInfoUpdateLoading: requests.profileUpdatePersonalInfo,
    isAvatarUpdateLoading: requests.profileUpdateAvatar,
    isAvatarDeleteLoading: requests.profileDeleteAvatar,
  }));
  const { userId } = useParams();

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
  } = useForm<Omit<UserDto, CommonKey.ID>>(updateUserInfoSchema, user ?? {});

  const handleRemove = (): void => {
    setValue(UserKey.PHOTO_URL, null);
    setSelectedFile(null);
  };

  const handleUpload = (): void => {
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

  return (
    <>
      <ContentWrapper
        size={ContentWrapperSize.MEDIUM}
        className={styles.settings}
      >
        <h1>Customize your experience</h1>
        <RBForm className={styles.form}>
          <label className={clsx(styles.cardInputLabel, 'fs-5')}>Avatar</label>
          {!unsavedUser.photoUrl ? (
            <div className={styles.photoUrlImgContainer}>
              <i className={clsx('bi bi-card-image', styles.noAvatar)}></i>
            </div>
          ) : (
            <UserAvatar
              className={`${clsx(styles.cardImage)} mb-3`}
              name={user?.nickname}
              src={unsavedUser.photoUrl}
              round={true}
              size="12.8rem"
              showTooltip={false}
            />
          )}
          {unsavedUser.photoUrl && (
            <Button
              variant="danger"
              className={clsx(styles.photoUrlControlButton, 'mb-3')}
              onClick={handleRemove}
              disabled={isPhotoUpdating}
            >
              Remove
            </Button>
          )}
          <input
            ref={inputRef}
            type={FieldType.FILE}
            onChange={handleFileSelected}
            name="image"
            hidden
          />
          <Button
            variant="success"
            className={clsx(
              styles.photoUrlControlButton,
              styles.spaceBetween,
              'mb-3',
            )}
            onClick={handleUpload}
            disabled={isPhotoUpdating}
          >
            <i
              className={`bi bi-cloud-arrow-up-fill text-white ${clsx(
                styles.uploadIcon,
              )}`}
            />
            Upload
          </Button>
          <span className={clsx(styles.uploadText, 'fs-6')}>
            For best results use an image at least 128px in .jpg format
          </span>
          <FormField
            label={FormFieldLabel.GAME_TIME}
            type={FormFieldType.NUMBER}
            register={register('gameTime')}
            error={errors.gameTime}
            inputClassName={styles.racingField}
            note={<span>* only for the single player mode</span>}
          />
          <hr />
          <FormField
            label={FormFieldLabel.COUNTDOWN_BEFORE_GAME}
            type={FormFieldType.NUMBER}
            register={register('countdownBeforeGame')}
            error={errors.countdownBeforeGame}
            inputClassName={styles.racingField}
            note={<span>* only for the single player mode</span>}
          />
          <Button
            onSubmit={handleSubmit(handleSaveChanges)}
            disabled={!user || isPhotoUpdating}
          />
        </RBForm>
      </ContentWrapper>
      <CropAvatar
        isShown={isCropModalVisible}
        src={selectedImgURL}
        handleClose={handleCropModalClose}
        updateAvatar={updateAvatar}
      />
    </>
  );
};

export { Profile };
