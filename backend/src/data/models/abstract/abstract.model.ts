import { Model } from 'objection';
import { CommonDbKey } from '~/common/enums/enums';

class Abstract extends Model {
  public [CommonDbKey.ID]!: number;

  public [CommonDbKey.CREATED_AT]!: string;

  public [CommonDbKey.UPDATED_AT]!: string;

  public override $beforeInsert(): void {
    this[CommonDbKey.CREATED_AT] = new Date().toISOString();
    this[CommonDbKey.UPDATED_AT] = new Date().toISOString();
  }

  public override $beforeUpdate(): void {
    this[CommonDbKey.UPDATED_AT] = new Date().toISOString();
  }
}

export { Abstract };
