import { Model } from 'objection';
import { CommonKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/interfaces';

class Base extends Model {
  public [CommonKey.ID]!: ICommonRecord[CommonKey.ID];

  public [CommonKey.CREATED_AT]!: ICommonRecord[CommonKey.CREATED_AT];

  public [CommonKey.UPDATED_AT]!: ICommonRecord[CommonKey.UPDATED_AT];

  public override $beforeInsert(): void {
    this[CommonKey.CREATED_AT] = new Date().toISOString();
    this[CommonKey.UPDATED_AT] = new Date().toISOString();
  }

  public override $beforeUpdate(): void {
    this[CommonKey.UPDATED_AT] = new Date().toISOString();
  }
}

export { Base };
