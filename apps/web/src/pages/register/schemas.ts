import * as Yup from 'yup';
import { MESSAGE_REQUIRED } from '../../utils/constants';

export const schemaRegister = Yup.object().shape({
  name: Yup.string().required(MESSAGE_REQUIRED),
  cnpj: Yup.string().required(MESSAGE_REQUIRED),
  phone: Yup.string().required(MESSAGE_REQUIRED),
  email: Yup.string().required(MESSAGE_REQUIRED).email(),
  street: Yup.string().required(MESSAGE_REQUIRED),
  number: Yup.string().required(MESSAGE_REQUIRED),
  complement: Yup.string().optional(),
  neighborhood: Yup.string().required(MESSAGE_REQUIRED),
  city: Yup.string().required(MESSAGE_REQUIRED),
  state: Yup.string().required(MESSAGE_REQUIRED),
  zipCode: Yup.string().required(MESSAGE_REQUIRED),
  nameUser: Yup.string().required(MESSAGE_REQUIRED),
  emailUser: Yup.string().required(MESSAGE_REQUIRED),
  passwordUser: Yup.string().required(MESSAGE_REQUIRED),
});
