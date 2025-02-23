"use strict";
/*
STATUS:{
  1: Pendente
  2: Paga
  3: Em atraso
  4: Paga com atraso
}
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BILL_TO_PAY_STATUS = void 0;
exports.getStatusDescription = getStatusDescription;
var BILL_TO_PAY_STATUS;
(function (BILL_TO_PAY_STATUS) {
    BILL_TO_PAY_STATUS[BILL_TO_PAY_STATUS["PENDING"] = 1] = "PENDING";
    BILL_TO_PAY_STATUS[BILL_TO_PAY_STATUS["PAID"] = 2] = "PAID";
    BILL_TO_PAY_STATUS[BILL_TO_PAY_STATUS["OVERDUE"] = 3] = "OVERDUE";
    BILL_TO_PAY_STATUS[BILL_TO_PAY_STATUS["PAID_LATE"] = 4] = "PAID_LATE";
})(BILL_TO_PAY_STATUS || (exports.BILL_TO_PAY_STATUS = BILL_TO_PAY_STATUS = {}));
function getStatusDescription(status) {
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
