import * as Yup from 'yup';
import { MESSAGE_REQUIRED } from '../../../../../utils/constants';

const paymentMethodSchema = Yup.object().shape({
  name: Yup.string().required(MESSAGE_REQUIRED).min(1),
  tax: Yup.number().required(MESSAGE_REQUIRED),
});

export default paymentMethodSchema;
