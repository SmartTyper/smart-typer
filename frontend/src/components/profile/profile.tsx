import { FC } from 'common/types/types';
import { toast } from 'react-toastify';
import { Button, Form, Col, Row } from 'react-bootstrap';
import {
  useState,
  useEffect,
  useParams
  useDispatch,
  useSelector,
  useRef,
} from 'hooks/hooks';
import { HttpError } from 'common/exceptions';
import { authActions, profileActions } from 'store/actions';
import { userApi } from 'services';
import { IUser } from 'common/interfaces';
import { FieldType, ToastMessage } from 'common/enums';
import { useForm, yupResolver } from 'hooks';
import { profileInfoSchema } from 'common/validations';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from 'common/constants/constants';
import { UserAvatar } from 'components/common';
import {
  getAllowedClasses,
  bytesToMegabytes,
  canvasToBlob,
  canvasToDataURL,
} from 'common/helpers';
import { ApplyChangesButton } from '../apply-changes-button';
import { CropAvatar } from '../crop-avatar';

import styles from './styles.module.scss';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [selectedImgURL, setSelectedImgURL] = useState('');
  const [croppedImgURL, setCroppedImgURL] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isCropModalVisible, setCropModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(profileActions.loadUser({userId}))
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      setUserFullName(user.fullName);
    }
  }, [user]);

  const {
    register,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(profileInfoSchema),
  });

  const handleRemove = (): void => {
    if (user) {
      setIsDeleting(true);

      userApi
        .deleteAvatar()
        .then(() => dispatch(authActions.updateUser({ photoUrl: null })))
        .finally(() => {
          setIsDeleting(false);
          setSelectedImgURL('');
          setCroppedImgURL('');
        });
    }
  };

  const handleUpload = (): void => {
    inputRef.current?.click();
  };

  const handleSaveChanges = async (): Promise<void> => {
    if (user) {
      setIsUploading(true);
      try {
        const updatedUser = await userApi.update({
          ...user,
          fullName: userFullName,
        });
        toast.success(ToastMessage.SETTINGS_UPDATED);
        dispatch(
          authActions.setUser({ ...updatedUser, photoUrl: user.photoUrl }),
        );
        setUserFullName(updatedUser.fullName);
      } catch (err) {
        const httpError = err as HttpError;
        toast.error(httpError.message);
      }
    }

    if (selectedFile) {
      setIsUploading(true);
      try {
        const updatedUser = await userApi.uploadAvatar(
          selectedFile,
          selectedFile.name,
        );
        dispatch(authActions.setUser(updatedUser));
        setSelectedFile(undefined);
      } catch (err) {
        const httpError = err as HttpError;
        toast.error(httpError.message);
      }
    }

    setIsUploading(false);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      if (bytesToMegabytes(e.target.files[0].size) > MAX_FILE_SIZE) {
        toast.error(`File must be less than ${MAX_FILE_SIZE} Mb.`);
      } else if (!ALLOWED_FILE_TYPES.includes(e.target.files[0].type)) {
        toast.error(
          'Forbidden file type. Please choose image with type .png, .jpg or .jpeg',
        );
      } else {
        const reader = new FileReader();

        reader.onload = (e): void => {
          if (e.target && e.target.result) {
            setSelectedImgURL(e.target.result.toString());
          }
        };

        const selectedFile = e.target.files[0];

        reader.readAsDataURL(selectedFile);

        setSelectedFile(selectedFile);
        setCropModalVisible(true);
      }
    }
  };

  const handleCropModalClose = (): void => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setCropModalVisible(false);
  };

  const updateAvatar = async (
    croppedImageCanvas: HTMLCanvasElement,
  ): Promise<void> => {
    const croppedImageBlob = await canvasToBlob(croppedImageCanvas);
    const newImageName = 'cropped_' + selectedFile?.name;
    const croppedImageFile = new File([croppedImageBlob], newImageName, {
      type: 'image/jpeg',
    });

    const croppedImageDataURL = canvasToDataURL(croppedImageCanvas);

    setCroppedImgURL(croppedImageDataURL);
    setSelectedFile(croppedImageFile);

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setCropModalVisible(false);
  };
  return (
    <>
      <Row className="m-0">
        <Col
          md={4}
          className="d-flex text-center flex-column align-items-center justify-content-center"
        >
          <label className={getAllowedClasses(styles.cardInputLabel, 'fs-5')}>
            Avatar
          </label>
          {!croppedImgURL && !user?.photoUrl ? (
            <div className={styles.photoUrlImgContainer}>
              <i
                className={getAllowedClasses(
                  'bi bi-card-image',
                  styles.noAvatar,
                )}
              ></i>
            </div>
          ) : (
            <UserAvatar
              className={`${getAllowedClasses(styles.cardImage)} mb-3`}
              name={user?.fullName}
              src={croppedImgURL ? croppedImgURL : user?.photoUrl ?? ''}
              round={true}
              size="12.8rem"
              showTooltip={false}
            />
          )}

          {user?.photoUrl && (
            <Button
              variant="danger"
              className={getAllowedClasses(
                styles.photoUrlControlButton,
                'mb-3',
              )}
              onClick={handleRemove}
              disabled={isDeleting}
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
            className={getAllowedClasses(
              styles.photoUrlControlButton,
              styles.spaceBetween,
              'mb-3',
            )}
            onClick={handleUpload}
          >
            <i
              className={`bi bi-cloud-arrow-up-fill text-white ${getAllowedClasses(
                styles.uploadIcon,
              )}`}
            />
            Upload
          </Button>
          <span className={getAllowedClasses(styles.uploadText, 'fs-6')}>
            For best results use an image at least 128px in .jpg format
          </span>
        </Col>
        <Col className="ps-0">
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className={getAllowedClasses(styles.cardInputLabel)}>
                Email address
              </Form.Label>
              <Form.Control
                className={getAllowedClasses(styles.cardInput)}
                type={FieldType.EMAIL}
                placeholder="Enter email"
                value={user ? user.email : ''}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupFullName">
              <Form.Label className={getAllowedClasses(styles.cardInputLabel)}>
                Full name
              </Form.Label>
              <Form.Control
                value={userFullName}
                {...register('fullName')}
                className={getAllowedClasses(styles.cardInput)}
                type={FieldType.TEXT}
                placeholder="Full name"
                onChange={(e): void => setUserFullName(e.target.value)}
                isInvalid={!!errors.fullName}
              />
              {errors.fullName && (
                <Form.Control.Feedback type="invalid">
                  {errors?.fullName.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <ApplyChangesButton
        onSubmit={handleSaveChanges}
        isUploading={isUploading}
      />
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
