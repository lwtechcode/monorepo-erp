import * as Yup from 'yup';
import { MESSAGE_REQUIRED } from '../../../../utils/constants';

const billToPaySchema = Yup.object().shape({
  pay_date: Yup.string().optional().nullable(),
  creditor: Yup.string().required(MESSAGE_REQUIRED).nullable(),
  description: Yup.string().required(MESSAGE_REQUIRED).min(1).max(255),
  due_date: Yup.string().required(MESSAGE_REQUIRED),
  observation: Yup.string().nullable(),
  value: Yup.string().required(MESSAGE_REQUIRED),
});

export default billToPaySchema;
