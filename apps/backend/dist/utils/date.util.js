"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementDate = incrementDate;
exports.decrementDate = decrementDate;
exports.getAtualDate = getAtualDate;
exports.getAtualDateWithHours = getAtualDateWithHours;
const date_fns_1 = require("date-fns");
// interface DateComparisonResult {
//   isPaymentDateAfterDueDate: boolean;
//   isDueDateBeforeCurrentDate: boolean;
// }
function incrementDate(date, amount, unit) {
    return (0, date_fns_1.add)(date, { [unit]: amount });
}
function decrementDate(date, amount, unit) {
    return (0, date_fns_1.sub)(date, { [unit]: amount });
}
function getAtualDate() {
    const currentDate = new Date();
    return new Date((0, date_fns_1.format)(currentDate, 'yyyy-MM-dd'));
}
function getAtualDateWithHours() {
    const dataAtual = new Date();
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const horas = dataAtual.getHours().toString().padStart(2, '0');
    const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}
