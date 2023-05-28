import { yup } from 'dependencies/dependencies';

const emailSchema = yup.string().email();

export { emailSchema };
