export type BillToReceiveDTO = {
  due_date: Date;
  receipt_date?: Date;
  value: number;
  status?: number;
  description: string;
  observation?: string;
  client_id: string;
};
