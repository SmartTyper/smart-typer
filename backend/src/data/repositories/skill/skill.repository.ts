// import { SkillKey } from 'common/enums/enums';
import { CommonKey } from 'common/enums/enums';
import { Skill as SkillModel } from 'data/models/models';

type Constructor = {
  SkillModel: typeof SkillModel;
};

class Skill {
  private _SkillModel: typeof SkillModel;

  public constructor(params: Constructor) {
    this._SkillModel = params.SkillModel;
  }

  public async getAllIds(): Promise<CommonKey.ID[]> {
    return this._SkillModel
      .query()
      .select(CommonKey.ID)
      .castTo<CommonKey.ID[]>();
  }
}
export { Skill };
