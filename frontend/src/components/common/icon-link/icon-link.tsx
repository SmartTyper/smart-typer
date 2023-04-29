import { FC } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { clsx } from 'helpers/helpers';
import { Link } from 'components/common/common';

type Props = {
  to: AppRoute;
  label?: string;
  iconName?: string;
  className?: string;
  labelClassName?: string;
  iconClassName?: string;
};

const IconLink: FC<Props> = ({
  to,
  label,
  iconName,
  className,
  iconClassName,
  labelClassName,
  ...props
}) => (
  <Link className={className} to={to} {...props}>
    <>
      {iconName && <i className={clsx(iconName, iconClassName)}></i>}
      {label && <span className={labelClassName}>{label}</span>}
    </>
  </Link>
);

export { IconLink };
