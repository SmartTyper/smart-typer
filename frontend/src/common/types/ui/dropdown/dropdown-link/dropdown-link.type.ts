import { AppRoute } from 'common/enums/enums';
import { ItemData } from '../item-data/item-data.type';

type DropdownLink = ItemData & {
  link: AppRoute;
};

export type { DropdownLink };
