import * as Yup from 'yup';
import { MESSAGE_REQUIRED } from '../../../../utils/constants';

export const productSchema = Yup.object().shape({
  name: Yup.string().required(MESSAGE_REQUIRED),
  cost_price: Yup.string().required(MESSAGE_REQUIRED),
  sale_price: Yup.string().required(MESSAGE_REQUIRED),
});
