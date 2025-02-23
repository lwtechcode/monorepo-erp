import { REQUIREDS } from '../../messages';
import { schemaSalesType } from './types';

import * as Yup from 'yup';

export * from './types';

export const salesInitialValue: schemaSalesType = {
  client_id: null,
  client: null,
  method_payment: null,
  discount: null,
  total_value: null,
  additions: null,
};

export const salesSchema = Yup.object().shape({
  client: Yup.string().required(REQUIREDS.DEFAULT),
  method_payment: Yup.string().required(REQUIREDS.DEFAULT),
  discount: Yup.string().optional().nullable(),
});
