import * as Yup from 'yup';
import {
  MESSAGE_LENGHT_MAX_LETTER,
  MESSAGE_LENGHT_MIN_LETTER,
  MESSAGE_REQUIRED,
} from '../../../../utils/constants';

export const clientSchema = Yup.object().shape({
  name: Yup.string()
    .required(MESSAGE_REQUIRED)
    .min(4, MESSAGE_LENGHT_MIN_LETTER(4))
    .max(255, MESSAGE_LENGHT_MAX_LETTER(255)),
});
