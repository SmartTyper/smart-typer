import { FC } from 'common/types/types';
import { RRDLink } from 'components/external/external';
import { AlternativeRoute as Props } from '../../common/common';

const AlternativeRoute: FC<Props> = ({ label, path, linkText }) => {
  return (
    <div>
      <span>{label}</span>
      <RRDLink to={path}>
        <span> {linkText}</span>
      </RRDLink>
    </div>
  );
};

export { AlternativeRoute };
