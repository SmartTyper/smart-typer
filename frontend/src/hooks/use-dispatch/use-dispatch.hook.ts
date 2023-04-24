import { useDispatch as useReduxDispatch } from 'react-redux';
import { AppDispatch } from 'common/types/app/app';

const useDispatch: () => AppDispatch = () => useReduxDispatch<AppDispatch>();

export { useDispatch };
