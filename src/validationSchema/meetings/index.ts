import * as yup from 'yup';

export const meetingValidationSchema = yup.object().shape({
  date_time: yup.date().required(),
  customer_id: yup.string().nullable().required(),
  sales_team_member_id: yup.string().nullable().required(),
});
