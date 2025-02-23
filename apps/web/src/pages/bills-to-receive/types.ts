import { RequestVerbEnum, StatusEnum } from '../../enums';
import { Nullable } from '../../utils/types';

export type FilterBillToReceive = {
  description: string;
  status: string;
  startDate: string;
  endDate: string;
};

export type StateType = {
  form: FormBillToReceive;
  type: RequestVerbEnum;
};

export type BillToReceiveResponse = {
  billsToReceive: BillToReceive[];
  totalPages: number;
  totalCount: number;
  totalBillsToReceive: number;
};

export type BillToReceive = {
  id: string;
  description: string;
  due_date: string;
  receipt_date: string;
  value: number;
  client_id: string;
  client: {
    name: string;
    id: string;
  };
  observation: string;
  company_id: string;
  status: StatusEnum;
};

export type FormBillToReceive = Partial<
  Nullable<{
    id: string;
    description: string | null;
    due_date: string;
    receipt_date?: string | null;
    value: string | number;
    client_id: string;
    observation?: string | null;
  }>
>;
