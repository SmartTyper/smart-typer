import { WhiteSheetSize } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { WhiteSheet } from 'components/common/white-sheet/white-sheet';

const Theory: FC = () => {
  return (
    <WhiteSheet size={WhiteSheetSize.LARGE}>
      <div>Theory</div>
    </WhiteSheet>
  );
};

export { Theory };
