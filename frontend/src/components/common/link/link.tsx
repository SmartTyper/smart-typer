import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import { ReactNode } from 'react';

type Props = {
  to: AppRoute;
  children: ReactNode;
};

const Link: React.FC<Props> = ({ children, to }) => (
  <AppLink to={to}>{children}</AppLink>
);

export default Link;
