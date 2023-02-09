import { CommonKey } from 'common/enums/enums';

interface ICommonRecord {
  [CommonKey.ID]: number;
  [CommonKey.CREATED_AT]: string;
  [CommonKey.UPDATED_AT]: string;
}

export type { ICommonRecord };
