"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNonNumerics = removeNonNumerics;
exports.formatDate = formatDate;
exports.formatPhone = formatPhone;
exports.formatCPF = formatCPF;
exports.formatMoney = formatMoney;
const date_fns_1 = require("date-fns");
function removeNonNumerics(str) {
    if (!str)
        return "";
    return str.replace(/\D/g, "");
}
function formatDate(data) {
    if (isNaN(data.getTime())) {
        return "--";
    }
    // Ajustar para o fuso horário local
    const localDate = (0, date_fns_1.addMinutes)(data, data.getTimezoneOffset());
    const dia = (0, date_fns_1.getDate)(localDate).toString().padStart(2, "0");
    const mes = ((0, date_fns_1.getMonth)(localDate) + 1).toString().padStart(2, "0");
    const ano = (0, date_fns_1.getYear)(localDate);
    return `${dia}/${mes}/${ano}`;
}
function formatPhone(telefone) {
    const numeros = telefone.replace(/\D/g, "");
    if (numeros.length === 11) {
        return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7)}`;
    }
    return telefone;
}
function formatCPF(cpf) {
    const numeros = cpf.replace(/\D/g, "");
    if (numeros.length === 11) {
        return `${numeros.substring(0, 3)}.${numeros.substring(3, 6)}.${numeros.substring(6, 9)}-${numeros.substring(9)}`;
    }
    return cpf;
}
function formatMoney(valor) {
    if (!valor)
        return "R$ 0,00";
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
