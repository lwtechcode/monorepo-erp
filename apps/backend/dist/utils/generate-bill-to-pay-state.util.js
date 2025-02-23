"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBillToPayStatus = generateBillToPayStatus;
const date_fns_1 = require("date-fns");
const bill_to_pay_status_1 = require("../constants/bill-to-pay-status");
function generateBillToPayStatus(dueDate, paymentDate) {
    let status;
    if (paymentDate && dueDate) {
        const isLatePayment = (0, date_fns_1.isAfter)(paymentDate, dueDate);
        status = isLatePayment
            ? bill_to_pay_status_1.BILL_TO_PAY_STATUS.PAID_LATE
            : bill_to_pay_status_1.BILL_TO_PAY_STATUS.PAID;
    }
    else {
        const currentDate = new Date();
        const isOverdue = (0, date_fns_1.isBefore)(dueDate, currentDate);
        status = isOverdue
            ? bill_to_pay_status_1.BILL_TO_PAY_STATUS.OVERDUE
            : bill_to_pay_status_1.BILL_TO_PAY_STATUS.PENDING;
    }
    return status;
}
