import { RCBar } from 'components/external/external';
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Modal, UserLabel } from 'components/common/common';
import { FC, Rating, VoidAction } from 'common/types/types';
import { AvatarSize } from 'common/enums/enums';

import styles from './styles.module.scss';

Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  participantsRating: Rating;
  isVisible: boolean;
  onClose: VoidAction;
};

const ResultsModal: FC<Props> = ({
  participantsRating,
  isVisible,
  onClose,
}) => {
  const participantsNicknames = participantsRating.map(
    ({ nickname }) => nickname,
  );
  const participantsAverageSpeeds = participantsRating.map(
    ({ averageSpeed }) => averageSpeed,
  );
  const maxSpeed = Math.max.apply(null, participantsAverageSpeeds);

  const data = {
    labels: participantsNicknames,
    datasets: [
      {
        data: [12, 343, 223, 34, 34],
        // participantsAverageSpeeds,
        backgroundColor: '#4bba73',
        borderWidth: 4,
        borderColor: '#4bba73',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: maxSpeed + 1 - (maxSpeed % 1),
        ticks: {
          stepSize: 0.5,
          font: {
            size: 16,
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
  };

  return (
    <Modal
      isVisible={isVisible}
      onHide={onClose}
      title="Game results"
      className={styles.resultsModal}
    >
      <div className={styles.modalBody}>
        <div className={styles.chart}>
          <RCBar data={data} options={options} />
        </div>
        <div className={styles.participantsRating}>
          {participantsRating.map(({ id, nickname, photoUrl }, i) => {
            return (
              <div className={styles.participantsProfiles} key={id}>
                <span className={styles.ratingNumeration}>{i + 1}</span>
                <UserLabel
                  userName={nickname}
                  avatarSrc={photoUrl}
                  avatarSize={AvatarSize.SMALL}
                ></UserLabel>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export { ResultsModal };
