const BYTES_IN_MEGABYTE = 1024;

const bytesToMegabytes = (sizeInBytes: number): number => {
  return sizeInBytes / (BYTES_IN_MEGABYTE * BYTES_IN_MEGABYTE);
};

export { bytesToMegabytes };
