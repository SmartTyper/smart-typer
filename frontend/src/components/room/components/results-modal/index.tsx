import { Bar } from 'react-chartjs-2';
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
import { Modal } from 'react-bootstrap';

import { Profile } from 'components/common';
import { IParticipantsResult } from 'common/interfaces';
import { getAllowedClasses } from 'common/helpers';
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
  participantsRating: IParticipantsResult[];
  showModal: boolean;
  onModalClose: () => Promise<void>;
};

const ResultModal: React.FC<Props> = ({
  participantsRating,
  showModal,
  onModalClose,
}) => {
  const participantsByName = participantsRating.sort(
    (firstParticipant, secondParticipant) => {
      return firstParticipant.fullName > secondParticipant.fullName ? 1 : -1;
    },
  );
  const participantsFullNames = participantsByName.map(
    ({ fullName }) => fullName,
  );
  const participantsSpeeds = participantsByName.map(({ speed }) => speed);
  const maxSpeed = Math.max.apply(null, participantsSpeeds);

  const data = {
    labels: participantsFullNames,
    datasets: [
      {
        data: participantsSpeeds,
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
      className="d-flex align-items-center"
      size="xl"
      dialogClassName="w-50 rounded"
      show={showModal}
      onHide={onModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">Game results</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={getAllowedClasses(
          styles.modalBody,
          'w-100 d-flex justify-content-between',
        )}
      >
        <div className={styles.chart}>
          <Bar className="w-100" data={data} options={options} height={150} />
        </div>
        <div
          className={getAllowedClasses(
            styles.participantsRating,
            'ps-5 d-flex flex-column',
          )}
        >
          {participantsRating.map((participant, i) => {
            return (
              <div
                className="w-100 mb-3 d-flex align-items-center"
                key={participant.id}
              >
                <span className="me-3">{i + 1}</span>
                <Profile
                  userName={participant.fullName}
                  userAvatar={participant.photoUrl ?? ''}
                  textSize="fs-6"
                  avatarSize="28"
                  textColor="text-dark"
                />
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { ResultModal };
