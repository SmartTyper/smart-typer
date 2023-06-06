import { FC, LessonDto } from 'common/types/types';
import { clsx, replaceRouteIdParam } from 'helpers/helpers';
import { Card, Label, Link, Spinner } from 'components/common/common';
import {
  AlphabetLetter,
  AppRoute,
  CardHeaderColor,
  CardSize,
  LabelColor,
  SpinnerSize,
} from 'common/enums/enums';
import {
  ContentTypeToLabelColor,
  CreatorTypeToLabelColor,
  skillSymbolToArMarker,
} from 'common/maps/maps';

import styles from './styles.module.scss';

type Props = {
  lesson?: LessonDto;
  isStudyPlan?: boolean;
  isGenerating?: boolean;
};

const LessonCard: FC<Props> = ({
  lesson,
  isStudyPlan = false,
  isGenerating = false,
}) => {
  const { id, bestSkill } = lesson ?? {};

  const renderCard = (isDisabled = false): JSX.Element => {
    if (isGenerating) {
      return (
        <Card
          size={CardSize.NONE}
          color={CardHeaderColor.GREY}
          title="Generating..."
          centeredTitle
          className={clsx(styles.lessonCard, styles.disabled)}
          childrenContainerClassName={styles.generating}
          numbered
        >
          <Spinner size={SpinnerSize.MEDIUM} isCentered={false} />
        </Card>
      );
    }

    const { name, contentType, creatorType, content, bestSkill } =
      lesson as LessonDto;
    return (
      <Card
        size={CardSize.NONE}
        color={isDisabled ? CardHeaderColor.GREY : CardHeaderColor.GREEN}
        title={name}
        centeredTitle
        className={clsx(styles.lessonCard, isDisabled && styles.disabled)}
        numbered={isStudyPlan}
        childrenContainerClassName={styles.cardContentContainer}
      >
        {isGenerating ? (
          <Spinner size={SpinnerSize.LARGE} isCentered={false} />
        ) : (
          <div className={styles.cardContent}>
            <span className={styles.content}>{content}</span>
            <div className={styles.cardFooter}>
              <div className={styles.labels}>
                <Label
                  text={contentType}
                  color={
                    isDisabled
                      ? LabelColor.GREY
                      : ContentTypeToLabelColor[contentType]
                  }
                  className={styles.label}
                />
                <Label
                  text={creatorType}
                  color={
                    isDisabled
                      ? LabelColor.GREY
                      : CreatorTypeToLabelColor[creatorType]
                  }
                  className={styles.label}
                />
              </div>
              {!!bestSkill && (
                <div className={styles.bestSkillMarkers}>
                  {[...bestSkill].map((symbol) => (
                    <img
                      key={symbol}
                      src={skillSymbolToArMarker[symbol as AlphabetLetter]}
                      alt="AR marker"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    );
  };

  return (bestSkill || isGenerating) && isStudyPlan ? (
    renderCard(true)
  ) : (
    <Link to={replaceRouteIdParam(AppRoute.LESSON_$ID, id)}>
      {renderCard()}
    </Link>
  );
};

export { LessonCard };
