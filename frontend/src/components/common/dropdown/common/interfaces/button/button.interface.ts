import { VoidCallback } from 'common/types/types';
import { IItemData } from '../item-data/item-data.interface';

interface IButton extends IItemData {
  onClick?: VoidCallback<React.SyntheticEvent>;
}

export type { IButton };
