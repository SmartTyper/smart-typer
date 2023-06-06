import { CreatorType } from 'common/enums/enums';
import { FC } from 'common/types/types';

// import styles from './styles.module.scss';

type Props = {
  children: JSX.Element;
  prevLessonCreatorType?: CreatorType;
  currentLessonCreatorType: CreatorType;
};

const CategoryWrapper: FC<Props> = ({
  children,
  prevLessonCreatorType,
  currentLessonCreatorType,
}) => {
  const needToRenderCategoryTitle =
    !prevLessonCreatorType ||
    (prevLessonCreatorType !== currentLessonCreatorType &&
      prevLessonCreatorType === CreatorType.CURRENT_USER);
  const categoryTitle = !prevLessonCreatorType ? 'Personal' : 'Others';
  return (
    <div>
      {needToRenderCategoryTitle && <h1>{categoryTitle}</h1>}
      {children}
    </div>
  );
};

export { CategoryWrapper };
