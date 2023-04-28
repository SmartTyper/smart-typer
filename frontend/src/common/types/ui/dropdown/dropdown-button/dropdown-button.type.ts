import { VoidAction } from 'common/types/types';
import { ItemData } from '../item-data/item-data.type';

type DropdownButton = ItemData & {
  onClick: VoidAction;
};

export type { DropdownButton };
