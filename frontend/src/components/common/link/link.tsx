import { Link as AppLink } from 'react-router-dom';
import { FC } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { ReactNode } from 'react';

type Props = {
  to: AppRoute;
  children: ReactNode;
  className?: string;
};

const Link: FC<Props> = ({ children, to, className, ...props }) => (
  <AppLink to={to} className={className} {...props}>
    {children}
  </AppLink>
);

export { Link };
