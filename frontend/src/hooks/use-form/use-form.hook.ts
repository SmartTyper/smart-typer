import {
  useForm as useReactForm,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnySchema } from 'common/types/types';

const useForm = <TFieldValues extends FieldValues, TContext = unknown>(
  validationSchema: AnySchema,
): UseFormReturn<TFieldValues, TContext> => {
  return useReactForm<TFieldValues, TContext>({
    resolver: yupResolver(validationSchema),
  });
};

export { useForm };
