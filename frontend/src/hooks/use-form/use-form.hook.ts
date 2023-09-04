import {
  useForm as useReactForm,
  UseFormReturn,
  FieldValues,
  DefaultValues,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'common/types/types';

const useForm = <TFieldValues extends FieldValues, TContext = unknown>(
  validationSchema: AnyObjectSchema,
  defaultValues?: DefaultValues<TFieldValues>,
): UseFormReturn<TFieldValues, TContext> => {
  return useReactForm<TFieldValues, TContext>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
};

export { useForm };
