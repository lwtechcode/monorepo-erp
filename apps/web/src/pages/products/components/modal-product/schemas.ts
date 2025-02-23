import * as Yup from 'yup';
import { MESSAGE_REQUIRED } from '../../../../utils/constants';

export const productSchema = Yup.object().shape({
  name: Yup.string().required(MESSAGE_REQUIRED),
});
