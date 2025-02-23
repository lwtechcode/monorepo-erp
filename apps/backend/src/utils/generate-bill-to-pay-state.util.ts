import { isAfter, isBefore } from "date-fns";
import { BILL_TO_PAY_STATUS } from "../constants/bill-to-pay-status";

export function generateBillToPayStatus(
  dueDate: Date,
  paymentDate?: Date | null
) {
  let status;

  if (paymentDate && dueDate) {
    const isLatePayment = isAfter(paymentDate, dueDate);
    status = isLatePayment
      ? BILL_TO_PAY_STATUS.PAID_LATE
      : BILL_TO_PAY_STATUS.PAID;
  } else {
    const currentDate = new Date();
    const isOverdue = isBefore(dueDate, currentDate);
    status = isOverdue
      ? BILL_TO_PAY_STATUS.OVERDUE
      : BILL_TO_PAY_STATUS.PENDING;
  }

  return status;
}
