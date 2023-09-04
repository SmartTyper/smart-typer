import { CommonKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/interfaces';

type RecordWithoutCommonDateKeys<T extends ICommonRecord> = Omit<
  T,
  CommonKey.CREATED_AT | CommonKey.UPDATED_AT
>;

export type { RecordWithoutCommonDateKeys };
