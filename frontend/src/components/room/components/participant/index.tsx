import { DEFAULT_PARTICIPANT } from 'common/constants/constants';
import { UserLabel } from 'components/common/common';
import { FC, Participant as ParticipantType } from 'common/types/types';
import { RBProgressBar } from 'components/external/external';
import { AvatarSize } from 'common/enums/enums';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  participant: ParticipantType;
  textLength?: number;
  isCurrentParticipant: boolean;
};

const Participant: FC<Props> = ({
  participant,
  textLength,
  isCurrentParticipant,
}) => {
  const { isReady, nickname, photoUrl, position } = participant;
  return (
    <div className={styles.participant}>
      <div className={styles.mainInfo}>
        <div
          className={clsx(
            isReady ? styles.ready : styles.notReady,
            styles.readyStatusIndicator,
          )}
        />
        <UserLabel
          userName={nickname}
          avatarSrc={photoUrl}
          avatarSize={AvatarSize.SMALL}
        />
        {isCurrentParticipant && <span>{' (you)'}</span>}
      </div>
      <RBProgressBar
        animated
        now={
          textLength
            ? (position / textLength) * 100
            : DEFAULT_PARTICIPANT.position
        }
        className={styles.progressBar}
      />
    </div>
  );
};

export { Participant };
