import { VoidAction } from 'common/types/types';

type ModalButton = {
  isDisabled?: boolean;
  label: string;
  onClick: VoidAction;
};

export type { ModalButton };
