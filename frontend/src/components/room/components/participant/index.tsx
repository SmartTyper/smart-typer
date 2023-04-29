import ProgressBar from 'react-bootstrap/ProgressBar';
import { IParticipant } from 'common/interfaces';
import { DEFAULT_PARTICIPANT } from 'common/constants/game';
import { Profile } from 'components/common';
import { getAllowedClasses } from 'common/helpers';
import styles from './styles.module.scss';

type Props = {
  participant: IParticipant;
  textLength: number;
  isCurrentParticipant: boolean;
};

const Participant: React.FC<Props> = ({
  participant,
  textLength,
  isCurrentParticipant,
}) => {
  return (
    <div className="d-flex flex-column my-3">
      <div className="d-flex my-2">
        <div
          className={getAllowedClasses(
            'rounded-circle',
            participant.isReady ? 'bg-success' : 'bg-danger',
            styles.readyIndicator,
          )}
        />
        <Profile
          userName={participant.fullName}
          userAvatar={participant.photoUrl ?? ''}
          textSize="fs-6"
          avatarSize="28"
          textColor="text-dark"
        />
        {isCurrentParticipant && <span>{' (you)'}</span>}
      </div>
      <ProgressBar
        animated
        now={
          (participant.position / textLength) * 100 ||
          DEFAULT_PARTICIPANT.position
        }
        className="border border-success"
        variant="success"
      />
    </div>
  );
};

export { Participant };
