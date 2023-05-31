import { ReactCrop } from 'components/external/external';
import { useState } from 'hooks/hooks';
import { FC, VoidAction } from 'common/types/types';
import { Modal } from 'components/common/common';
import { canvasToBlob, canvasToDataUrl } from 'helpers/helpers';
import { CROPPED_IMAGE_TYPE } from 'common/constants/constants';
import { Crop, CropData } from '../../common/types/types';
import { useMemo } from 'react';

type Props = {
  isVisible: boolean;
  file: File | null;
  onClose: VoidAction;
  onUpdateAvatar: (croppedFile: File, croppedFileUrl: string) => void;
};

const CropAvatar: FC<Props> = ({
  isVisible,
  file,
  onClose,
  onUpdateAvatar,
}) => {
  const [crop, setCrop] = useState<Partial<Crop>>({
    unit: '%',
    height: 130,
    aspect: 1,
  });
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const src = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [(file as File)?.name]);

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

  const handleSubmit = async (): Promise<void> => {
    const croppedPhoto = getCroppedPhoto(
      image as HTMLImageElement,
      crop as CropData,
    );
    const croppedImageBlob = await canvasToBlob(croppedPhoto);
    const croppedImageFile = new File([croppedImageBlob], (file as File).name, {
      type: CROPPED_IMAGE_TYPE,
    });

    const croppedImageUrl = canvasToDataUrl(croppedPhoto);

    onClose();
    onUpdateAvatar(croppedImageFile, croppedImageUrl);
  };

  if (!file) {
    return null;
  }

  return (
    <Modal
      isVisible={isVisible}
      submitButton={{
        isDisabled: !src,
        label: 'OK',
        onClick: handleSubmit,
      }}
      cancelButton={{
        isDisabled: !src,
        label: 'Cancel',
        onClick: onClose,
      }}
      title="Crop the avatar"
    >
      <ReactCrop
        src={src}
        onChange={onCropChange}
        crop={crop}
        keepSelection
        circularCrop
        onImageLoaded={onImageLoaded}
      />
    </Modal>
  );
};

export { CropAvatar };
