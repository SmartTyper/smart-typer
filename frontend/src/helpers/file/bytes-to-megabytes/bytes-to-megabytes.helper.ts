import { BYTES_IN_MEGABYTE } from 'common/constants/constants';

const bytesToMegabytes = (sizeInBytes: number): number => {
  return sizeInBytes / (BYTES_IN_MEGABYTE * BYTES_IN_MEGABYTE);
};

export { bytesToMegabytes };
