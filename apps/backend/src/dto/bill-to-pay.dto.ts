export type BillToPayDTO = {
  description: string;
  due_date: Date;
  pay_date?: Date;
  value: number;
  creditor?: string;
  observation?: string;
  user_company_id: string;
  status?: number;
};
