import { TableName } from 'common/enums/enums';
import { ModelKey } from 'common/types/types';

const getTableFieldName = (
  tableName: TableName,
  fieldName: ModelKey,
): string => {
  return `${tableName}.${fieldName}`;
};

export { getTableFieldName };
