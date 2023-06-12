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
  isCurrentUser: boolean;
};

const Participant: FC<Props> = ({ participant, textLength, isCurrentUser }) => {
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
        <div className={styles.label}>
          <UserLabel
            userName={nickname}
            avatarSrc={photoUrl}
            avatarSize={AvatarSize.SMALL}
          />
          {isCurrentUser && <span>(you)</span>}
        </div>
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
