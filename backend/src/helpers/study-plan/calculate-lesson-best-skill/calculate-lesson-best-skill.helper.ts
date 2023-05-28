import { BktResult, IrtResult, Skill } from 'common/types/types';
import { CommonKey, SkillKey } from 'smart-typer-shared';

const calculateLessonBestSkill = (
  currentSkillLevels: Omit<Skill, SkillKey.NAME>[],
  resultSkillLevels: IrtResult | BktResult,
): Skill[CommonKey.ID] => {
  const bestSkill = currentSkillLevels
    .map(({ id, level }) => {
      const resultLevel = resultSkillLevels.find(
        (skillLevel) => id === skillLevel.skillId,
      );
      if (!resultLevel) {
        return { id, delta: 0 };
      }
      return { id, delta: resultLevel.pKnown - level };
    })
    .sort((a, b) => a.delta - b.delta)
    .pop();

  return bestSkill?.id as Skill[CommonKey.ID];
};

export { calculateLessonBestSkill };
