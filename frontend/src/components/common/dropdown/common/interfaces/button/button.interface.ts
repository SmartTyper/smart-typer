import { VoidAction } from 'common/types/types';
import { IItemData } from '../item-data/item-data.interface';

interface IButton extends IItemData {
  onClick?: VoidAction;
}

export type { IButton };
