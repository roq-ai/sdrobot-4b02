import * as yup from 'yup';
import { prospectingCustomerValidationSchema } from 'validationSchema/prospecting-customers';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  prospecting_customer: yup.array().of(prospectingCustomerValidationSchema),
});
