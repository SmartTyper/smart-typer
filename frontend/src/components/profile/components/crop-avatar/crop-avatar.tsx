import { RBModal, ReactCrop } from 'components/external/external';
import { useState } from 'hooks/hooks';
import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { canvasToBlob } from 'helpers/helpers';
import { CROPPED_IMAGE_TYPE } from 'common/constants/constants';
import { Crop, CropData } from './common/types/types';

type Props = {
  isVisible: boolean;
  file: File | null;
  onClose: () => void;
  updateAvatar: (croppedFile: File) => void;
};

const CropAvatar: FC<Props> = ({ isVisible, file, onClose, updateAvatar }) => {
  const [crop, setCrop] = useState<Partial<Crop>>({
    unit: '%',
    height: 130,
    aspect: 1,
  });
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const onCropChange = (newCrop: Crop): void => {
    setCrop(newCrop);
  };

  const onImageLoaded = (photo: HTMLImageElement): void => {
    setImage(photo);
  };

  const getCroppedPhoto = (
    photo: HTMLImageElement,
    cropData: CropData,
  ): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const scaleX = photo.naturalWidth / photo.width;
    const scaleY = photo.naturalHeight / photo.height;
    canvas.width = cropData.width;
    canvas.height = cropData.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.drawImage(
      photo,
      cropData.x * scaleX,
      cropData.y * scaleY,
      cropData.width * scaleX,
      cropData.height * scaleY,
      0,
      0,
      cropData.width,
      cropData.height,
    );

    return canvas;
  };

  const onSave = async (): Promise<void> => {
    const croppedPhoto = getCroppedPhoto(
      image as HTMLImageElement,
      crop as CropData,
    );
    const croppedImageBlob = await canvasToBlob(croppedPhoto);
    const croppedImageFile = new File([croppedImageBlob], (file as File).name, {
      type: CROPPED_IMAGE_TYPE,
    });

    onClose();
    updateAvatar(croppedImageFile);
  };

  if (!file) {
    return null;
  }

  return (
    <RBModal
      className="d-flex align-items-center"
      dialogClassName="w-25 rounded"
      show={isVisible}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <RBModal.Header closeButton>
        <RBModal.Title className="fs-6">Crop the avatar</RBModal.Title>
      </RBModal.Header>
      <RBModal.Body>
        <ReactCrop
          src={URL.createObjectURL(file)}
          onChange={onCropChange}
          crop={crop}
          keepSelection
          circularCrop
          minHeight={128}
          onImageLoaded={onImageLoaded}
        />
      </RBModal.Body>
      <RBModal.Footer>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </RBModal.Footer>
    </RBModal>
  );
};

export { CropAvatar };
