import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { RootState } from 'common/types/app/app';

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export { useSelector };
