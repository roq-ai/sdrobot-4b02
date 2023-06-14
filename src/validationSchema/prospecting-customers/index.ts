import * as yup from 'yup';

export const prospectingCustomerValidationSchema = yup.object().shape({
  persona: yup.string().required(),
  company: yup.string().required(),
  industry: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
