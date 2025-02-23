import * as Yup from 'yup';
import { MESSAGE_REQUIRED } from '../../../../utils/constants';

const billToReceiveSchema = Yup.object().shape({
  receipt_date: Yup.string().optional().nullable(),
  client_id: Yup.string().required(MESSAGE_REQUIRED).nullable(),
  description: Yup.string().required(MESSAGE_REQUIRED).min(1).max(255),
  due_date: Yup.string().required(MESSAGE_REQUIRED),
  observation: Yup.string().nullable(),
  value: Yup.string().required(MESSAGE_REQUIRED),
});

export default billToReceiveSchema;
