const canvasToDataUrl = (canvas: HTMLCanvasElement): string => {
  const imageDataUrl = canvas.toDataURL('image/jpeg');
  return imageDataUrl;
};

export { canvasToDataUrl };
