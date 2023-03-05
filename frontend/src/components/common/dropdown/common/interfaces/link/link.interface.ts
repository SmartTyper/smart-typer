import { AppRoute } from 'common/enums/enums';
import { IItemData } from '../item-data/item-data.interface';

interface ILink extends IItemData {
  link: AppRoute;
}

export type { ILink };
