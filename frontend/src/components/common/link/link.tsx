import { FC } from 'common/types/types';
import { RRDLink } from 'components/external/external';
import { AppRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute;
  children: JSX.Element | JSX.Element[];
  className?: string;
};

const Link: FC<Props> = ({ children, to, className, ...props }) => (
  <RRDLink to={to} className={className} {...props}>
    {children}
  </RRDLink>
);

export { Link };
