import { CROPPED_IMAGE_TYPE } from 'common/constants/constants';

const ERROR_MESSAGE = 'Canvas is empty';

const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }
      console.error(ERROR_MESSAGE);
    }, CROPPED_IMAGE_TYPE);
  });
};

export { canvasToBlob };
