import { AppRoute } from 'common/enums/enums';
import { ItemData } from '../item-data/item-data.type';

type Link = ItemData & {
  link: AppRoute;
};

export type { Link };
