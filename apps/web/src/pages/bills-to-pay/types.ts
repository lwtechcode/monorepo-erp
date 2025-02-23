import { RequestVerbEnum } from '../../enums';
import { Nullable } from '../../utils/types';

export type FilterBillToPay = {
  description: string;
  status: string;
  startDate: string;
  endDate: string;
};

export type StateType = {
  form: FormBillToPay;
  type: RequestVerbEnum;
};

export type BillToPayResponse = {
  billsToPay: BillToPay[];
  totalPages: number;
  totalCount: number;
  totalBillsToPay: number;
};

export type BillToPay = {
  id: string;
  description: string;
  due_date: string;
  pay_date: string | null;
  value: number | null;
  status: number;
  payment_method: number | null;
  creditor: string | null;
  observation: string | null;
  created_at: string;
  updated_at: string;
  user_company_id: string;
};

export type FormBillToPay = Partial<
  Nullable<{
    id?: string;
    pay_date: string | null;
    creditor: string | null;
    description: string | null;
    due_date: string | null;
    observation: string | null;
    value: number;
  }>
>;
