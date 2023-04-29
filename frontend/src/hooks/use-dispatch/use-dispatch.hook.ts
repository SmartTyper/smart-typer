import { useDispatch as useReduxDispatch } from 'react-redux';
import { Dispatch } from 'common/types/types';

const useDispatch: () => Dispatch = () => useReduxDispatch<Dispatch>();

export { useDispatch };
