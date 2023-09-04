import { CreatorType, LabelColor } from 'common/enums/enums';

const CreatorTypeToLabelColor = {
  [CreatorType.CURRENT_USER]: LabelColor.BLUE,
  [CreatorType.OTHER_USERS]: LabelColor.VIOLET,
  [CreatorType.SYSTEM]: LabelColor.PINK,
};

export { CreatorTypeToLabelColor };
