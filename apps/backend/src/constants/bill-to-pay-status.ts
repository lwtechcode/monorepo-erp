/* 
STATUS:{
  1: Pendente
  2: Paga
  3: Em atraso
  4: Paga com atraso
}
*/

export enum BILL_TO_PAY_STATUS {
  PENDING = 1,
  PAID = 2,
  OVERDUE = 3,
  PAID_LATE = 4,
}

export function getStatusDescription(status: BILL_TO_PAY_STATUS): string {
  switch (status) {
    case BILL_TO_PAY_STATUS.PENDING:
      return "Pendente";
    case BILL_TO_PAY_STATUS.PAID:
      return "Paga";
    case BILL_TO_PAY_STATUS.OVERDUE:
      return "Em atraso";
    case BILL_TO_PAY_STATUS.PAID_LATE:
      return "Paga com atraso";
    default:
      throw new Error("Status inválido");
  }
}
