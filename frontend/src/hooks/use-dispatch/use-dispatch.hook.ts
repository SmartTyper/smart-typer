import { useDispatch as useReduxDispatch } from 'react-redux';
import { Dispatch } from 'common/types/app/app';

const useDispatch: () => Dispatch = () => useReduxDispatch<Dispatch>();

export { useDispatch };
