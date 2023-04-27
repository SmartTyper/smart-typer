import React from 'react';
// import _ from 'lodash';
// import { FC, User } from 'common/types/types';
// import { toast } from 'react-toastify';
// import { Button, Form, Col, Row } from 'react-bootstrap';
// import {
//   useState,
//   useEffect,
//   useParams
//   useDispatch,
//   useSelector,
//   useRef,
// } from 'hooks/hooks';
// import { HttpError } from 'common/exceptions';
// import { authActions, profileActions } from 'store/actions';
// import { userApi } from 'services';
// import { IUser } from 'common/interfaces';
// import { FieldType, ToastMessage } from 'common/enums';
// import { useForm, yupResolver } from 'hooks';
// import { profileInfoSchema } from 'common/validations';
// import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from 'common/constants/constants';
// import { UserAvatar } from 'components/common';
// import {
//   getAllowedClasses,
//   bytesToMegabytes,
//   canvasToBlob,
//   canvasToDataURL,
// } from 'common/helpers';
// import { ApplyChangesButton } from '../apply-changes-button';
// import { CropAvatar } from '../crop-avatar';

// import styles from './styles.module.scss';
// import { notification as notificationService } from 'services/services';
// import { ValidationErrorMessage } from 'common/enums/enums';

// const UNCHANGEABLE_BY_UPDATE_INFO_METHOD_FIELDS = ['id', 'photoUrl']

const Profile: React.FC = () => {
  return <div></div>;
  //   const dispatch = useDispatch();
  //   const inputRef = useRef<HTMLInputElement>(null);
  //   const [unsavedUser, setUnsavedUser] = useState<User | null>(null);
  //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //   const [isCropModalVisible, setIsCropModalVisible] = useState(false);
  //   const { user } = useSelector((state) => state.auth);
  //   const { userId } = useParams();
  //   useEffect(() => {
  //     if (userId) {
  //       dispatch(profileActions.loadUser({userId}))
  //     }
  //   }, [userId]);
  //   useEffect(() => {
  //     if (user) {
  //       setUnsavedUser(user);
  //     }
  //   }, [user]);
  //   const {
  //     register,
  //     formState: { errors },
  //   } = useForm<User>({
  //     resolver: yupResolver(profileInfoSchema),
  //   });
  //   const handleRemove = (): void => {
  //     setUnsavedUser((prev) => ({photoUrl: null, ...prev} as User));
  //     setSelectedFile(null);
  //   };
  //   const handleUpload = (): void => {
  //     inputRef.current?.click();
  //   };
  //   const handleSaveChanges = async (): Promise<void> => {
  //     if(!user) {
  //       return;
  //     }
  //     if (selectedFile) {
  //       dispatch(profileActions.updateAvatar(selectedFile));
  //     }
  //     if(user.photoUrl && !unsavedUser?.photoUrl) {
  //       dispatch(profileActions.deleteAvatar());
  //     }
  //     const userInfo = _.omit(user, UNCHANGEABLE_BY_UPDATE_INFO_METHOD_FIELDS);
  //     const unsavedUserInfo = _.omit(unsavedUser, UNCHANGEABLE_BY_UPDATE_INFO_METHOD_FIELDS)
  //     if(_.isEqual(userInfo, unsavedUserInfo)) {
  //       dispatch(profileActions.updateInfo(unsavedUserInfo));
  //     }
  //   };
  //   const handleFileSelected = (fileSelectedEvent: React.ChangeEvent<HTMLInputElement>): void => {
  //     const [file] = fileSelectedEvent.target.files ?? [];
  //     if (file) {
  //       const {size, type} = file;
  //       const sizeInMegabytes = bytesToMegabytes(size);
  //       if (sizeInMegabytes > MAX_FILE_SIZE) {
  //         notificationService.error(ValidationErrorMessage.INVALID_FILE_SIZE);
  //         return;
  //       }
  //       if (!ALLOWED_FILE_TYPES.includes(type)) {
  //         notificationService.error(ValidationErrorMessage.FORBIDDEN_FILE_TYPE);
  //         return;
  //       }
  //       setSelectedFile(file);
  //       setIsCropModalVisible(true);
  //     };
  //   }
  //   const handleCropModalClose = (): void => {
  //     if (inputRef.current) {
  //       inputRef.current.value = '';
  //     }
  //     setIsCropModalVisible(false);
  //   };
  //   const updateAvatar = async (
  //     croppedFile: File,
  //   ): Promise<void> => {
  //     setSelectedFile(croppedFile);
  //     setIsCropModalVisible(false);
  //   };
  //   return (
  //     <>
  //       <Row className="m-0">
  //         <Col
  //           md={4}
  //           className="d-flex text-center flex-column align-items-center justify-content-center"
  //         >
  //           <label className={getAllowedClasses(styles.cardInputLabel, 'fs-5')}>
  //             Avatar
  //           </label>
  //           {!unsavedUser.photoUrl ? (
  //             <div className={styles.photoUrlImgContainer}>
  //               <i
  //                 className={getAllowedClasses(
  //                   'bi bi-card-image',
  //                   styles.noAvatar,
  //                 )}
  //               ></i>
  //             </div>
  //           ) : (
  //             <UserAvatar
  //               className={`${getAllowedClasses(styles.cardImage)} mb-3`}
  //               name={user?.nickname}
  //               src={unsavedUser.photoUrl}
  //               round={true}
  //               size="12.8rem"
  //               showTooltip={false}
  //             />
  //           )}
  //           {unsavedUser.photoUrl && (
  //             <Button
  //               variant="danger"
  //               className={getAllowedClasses(
  //                 styles.photoUrlControlButton,
  //                 'mb-3',
  //               )}
  //               onClick={handleRemove}
  //               disabled={isPhotoUpdating}
  //             >
  //               Remove
  //             </Button>
  //           )}
  //           <input
  //             ref={inputRef}
  //             type={FieldType.FILE}
  //             onChange={handleFileSelected}
  //             name="image"
  //             hidden
  //           />
  //           <Button
  //             variant="success"
  //             className={getAllowedClasses(
  //               styles.photoUrlControlButton,
  //               styles.spaceBetween,
  //               'mb-3',
  //             )}
  //             onClick={handleUpload}
  //             disabled={isPhotoUpdating}
  //           >
  //             <i
  //               className={`bi bi-cloud-arrow-up-fill text-white ${getAllowedClasses(
  //                 styles.uploadIcon,
  //               )}`}
  //             />
  //             Upload
  //           </Button>
  //           <span className={getAllowedClasses(styles.uploadText, 'fs-6')}>
  //             For best results use an image at least 128px in .jpg format
  //           </span>
  //         </Col>
  //         <Col className="ps-0">
  //           <Form>
  //             <Form.Group className="mb-3" controlId="formGroupEmail">
  //               <Form.Label className={getAllowedClasses(styles.cardInputLabel)}>
  //                 Email address
  //               </Form.Label>
  //               <Form.Control
  //                 className={getAllowedClasses(styles.cardInput)}
  //                 type={FieldType.EMAIL}
  //                 placeholder="Enter email"
  //                 value={user ? user.email : ''}
  //                 disabled
  //               />
  //             </Form.Group>
  //             <Form.Group className="mb-3" controlId="formGroupFullName">
  //               <Form.Label className={getAllowedClasses(styles.cardInputLabel)}>
  //                 Full name
  //               </Form.Label>
  //               <Form.Control
  //                 value={unsavedUser?.nickname}
  //                 {...register('fullName')}
  //                 className={getAllowedClasses(styles.cardInput)}
  //                 type={FieldType.TEXT}
  //                 placeholder="Full name"
  //                 onChange={(e): void => setUserFullName(e.target.value)}
  //                 isInvalid={!!errors.fullName}
  //               />
  //               {errors.fullName && (
  //                 <Form.Control.Feedback type="invalid">
  //                   {errors?.fullName.message}
  //                 </Form.Control.Feedback>
  //               )}
  //             </Form.Group>
  //           </Form>
  //         </Col>
  //       </Row>
  //       <Button
  //         onSubmit={handleSaveChanges}
  //         disabled={!user || isPhotoUpdating}
  //       />
  //       <CropAvatar
  //         isShown={isCropModalVisible}
  //         src={selectedImgURL}
  //         handleClose={handleCropModalClose}
  //         updateAvatar={updateAvatar}
  //       />
  //     </>
  //   );
};

export { Profile };
