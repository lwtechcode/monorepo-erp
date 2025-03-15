import * as Yup from 'yup';
import { MESSAGE_REQUIRED } from '../../utils/constants';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required(MESSAGE_REQUIRED),
  password: Yup.string().required(MESSAGE_REQUIRED),
});
