// import { SkillKey } from 'common/enums/enums';
import { ISkillRecord } from 'common/interfaces/interfaces';
import { Skill as SkillModel } from 'data/models/models';

type Constructor = {
  SkillModel: typeof SkillModel;
};

class Skill {
  private _SkillModel: typeof SkillModel;

  public constructor(params: Constructor) {
    this._SkillModel = params.SkillModel;
  }

  public async getAllIds(): Promise<ISkillRecord[]> {
    return this._SkillModel.query().select('id');
  }
}
export { Skill };
