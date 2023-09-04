import { BYTES_IN_MEGABYTE } from 'common/constants/constants';

const megabytesToBytes = (sizeInMegabytes: number): number => {
  return sizeInMegabytes*BYTES_IN_MEGABYTE*BYTES_IN_MEGABYTE;
};

export { megabytesToBytes };
