import { FC } from 'common/types/types';
import { Link } from 'components/common/common';
import { AlternativeRoute as Props } from '../../common/common';

const AlternativeRoute: FC<Props> = ({ label, path, linkText }) => {
  return (
    <div>
      <span>{label}</span>
      <Link to={path}>
        <span> {linkText}</span>
      </Link>
    </div>
  );
};

export { AlternativeRoute };
