import { ContentType, LabelColor } from 'common/enums/enums';

const ContentTypeToLabelColor = {
  [ContentType.SENTENCES]: LabelColor.ORANGE,
  [ContentType.WORDS]: LabelColor.YELLOW,
  [ContentType.SYMBOLS]: LabelColor.GREEN,
};

export { ContentTypeToLabelColor };
