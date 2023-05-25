import { BktResult, IrtResult, Skill } from 'common/types/types';

const calculateLessonBestSkill = (
  currentSkillLevels: Omit<Skill, 'name'>[],
  resultSkillLevels: IrtResult | BktResult,
): Skill['id'] => {
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

  return bestSkill?.id as Skill['id'];
};

export { calculateLessonBestSkill };
