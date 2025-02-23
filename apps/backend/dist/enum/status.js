"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentStatusEnum = void 0;
exports.getFormattedPaymentStatus = getFormattedPaymentStatus;
var paymentStatusEnum;
(function (paymentStatusEnum) {
    paymentStatusEnum[paymentStatusEnum["EM_DIA"] = 1] = "EM_DIA";
    paymentStatusEnum[paymentStatusEnum["ATRASADA"] = 2] = "ATRASADA";
    paymentStatusEnum[paymentStatusEnum["PAGA"] = 3] = "PAGA";
    paymentStatusEnum[paymentStatusEnum["PAGA_COM_ATRASO"] = 4] = "PAGA_COM_ATRASO";
    paymentStatusEnum[paymentStatusEnum["RECEBIDA"] = 5] = "RECEBIDA";
    paymentStatusEnum[paymentStatusEnum["RECEBIDA_COM_ATRASO"] = 6] = "RECEBIDA_COM_ATRASO";
})(paymentStatusEnum || (exports.paymentStatusEnum = paymentStatusEnum = {}));
function getFormattedPaymentStatus(status) {
    const statusMap = {
        [paymentStatusEnum.EM_DIA]: "Em dia",
        [paymentStatusEnum.ATRASADA]: "Em atraso",
        [paymentStatusEnum.PAGA]: "Paga",
        [paymentStatusEnum.PAGA_COM_ATRASO]: "Paga com atraso",
        [paymentStatusEnum.RECEBIDA]: "Recebida",
        [paymentStatusEnum.RECEBIDA_COM_ATRASO]: "Recebida com atraso",
    };
    return statusMap[status] || "-";
}
