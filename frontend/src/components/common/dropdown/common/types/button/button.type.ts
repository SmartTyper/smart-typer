import { SyntheticEvent, VoidCallback } from 'common/types/types';
import { ItemData } from '../item-data/item-data.type';

type Button = ItemData & {
  onClick?: VoidCallback<SyntheticEvent>;
};

export type { Button };
